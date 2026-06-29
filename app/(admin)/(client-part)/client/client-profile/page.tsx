"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  useClientProfilePasswordMutation,
  useClientProfileUpdateMutation,
  useDeleteClientProfileMutation,
  useGetClientProfileQuery,
} from "@/feature/dashboard/client/profile";
import { useLocationsQuery } from "@/feature/dashboard/client/myJob";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [modalCurrentPassword, setModalCurrentPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selected location ids (supports one or many depending on what the API returns)
  const [locationId, setLocationId] = useState<string>("");

  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const { data: profileResponse, isLoading: isProfileLoading } =
    useGetClientProfileQuery({});

  const [profileUpdate, { isLoading: isSaving }] =
    useClientProfileUpdateMutation();
  const [passwordEdit, { isLoading: isSavingPassword }] =
    useClientProfilePasswordMutation();
  const { data: locationsResponse } = useLocationsQuery({});
  const [deleteProfile] = useDeleteClientProfileMutation();

  // The actual profile object, per your sample payload:
  // { data: { first_name, last_name, email, mobile, image_url, locations: [{id, name}] } }
  const profile = profileResponse?.data;
  const locationOptions = locationsResponse?.data ?? [];

  const handleDelete = async () => {
    try {
      const res = await deleteProfile({ password: modalCurrentPassword });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // Hydrate local form state once the profile loads (or changes)
  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
    setEmail(profile.email ?? "");
    setPhone(profile.mobile ?? "");

    if (profile.image_url) {
      setAvatarPreview(profile.image_url);
    }

    const existingLocation = profile.locations?.[0] as undefined;
    if (existingLocation) {
      setLocationId(String());
    }
  }, [profile]);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Max size is 10MB.");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function initials(first: string, last: string) {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  }

  async function handleSave() {
    setSaveError(null);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("mobile", phone);

    if (locationId) {
      formData.append("location_id[]", locationId);
    }

    if (avatarFile) {
      formData.append("image", avatarFile);
    }

    try {
      const result = await profileUpdate(formData).unwrap();
      toast.success(result?.message ?? "Profile updated.");
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 2500);
    } catch (err) {
      setSaveError("Something went wrong while saving. Please try again.");
    }
  }

  function isPasswordValid(value: string) {
    return value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
  }

  function openPasswordEdit() {
    setIsEditingPassword(true);
    setNewPassword("");
    setRepeatPassword("");
    setPasswordError(null);
  }

  function cancelPasswordEdit() {
    setIsEditingPassword(false);
    setNewPassword("");
    setRepeatPassword("");
    setPasswordError(null);
  }

  async function handleSavePassword() {
    if (!isPasswordValid(newPassword)) {
      setPasswordError(
        "Password needs to be 8 characters and contain at least one alphabet(A-#) and one number.",
      );
      return;
    }
    if (newPassword !== repeatPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const result = await passwordEdit({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: repeatPassword,
      }).unwrap();

      if (result?.success) {
        toast.success(result?.message ?? "Password updated.");
        setPasswordError(null);
        setIsEditingPassword(false);
        setNewPassword("");
        setRepeatPassword("");
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 2500);
      }
    } catch (err) {
      setPasswordError("Could not update password. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-full px-6 py-10 sm:px-10">
        {/* Top bar: avatar + upload, save button */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Profile picture"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-400">
                  {initials(firstName, lastName) || "OP"}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Upload Profile Picture
              </button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/gif,image/png"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <p className="mt-2 text-xs text-gray-400">
                Upload a JPG, GIF, or PNG (Max 10MB).
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isProfileLoading}
              className="rounded-lg bg-gray-900 px-5 h-[52px] text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 cursor-pointer"
            >
              {isSaving ? "Saving…" : "Save Changes"}
            </button>
            {savedMessage && (
              <span className="text-xs font-medium text-green-600">
                Changes saved
              </span>
            )}
            {saveError && (
              <span className="text-xs font-medium text-red-600">
                {saveError}
              </span>
            )}
          </div>
        </div>

        {/* Personal Details */}
        <h2 className="mt-10 text-lg font-semibold text-gray-900">
          Personal Details
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors focus:border-gray-400 focus:bg-white"
            />
          </div>

          {/* Locations */}
          <div className="relative sm:col-span-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Locations
            </label>

            <select
              id="location"
              value={locationId}
              onChange={(event) => setLocationId(event.target.value)}
              className="mt-2 h-[52px] w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            >
              <option value="" disabled>
                Start typing to filter
              </option>
              {locationOptions.map((loc) => (
                <option key={loc.id} value={loc.location}>
                  {loc.location}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="sm:col-span-2">
            {!isEditingPassword ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Password
                  </span>
                  <button
                    type="button"
                    onClick={openPasswordEdit}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 flex gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-gray-300"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Edit password
                  </span>
                  <button
                    type="button"
                    onClick={cancelPasswordEdit}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Password needs to be 8 characters and contain at least one
                  alphabet and one number.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="current_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <Input
                      id="current_password"
                      type="password"
                      placeholder="Enter Password"
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        setPasswordError(null);
                      }}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter Password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordError(null);
                      }}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="repeatPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Repeat password
                    </label>
                    <Input
                      id="repeatPassword"
                      type="password"
                      placeholder="Repeat password"
                      value={repeatPassword}
                      onChange={(e) => {
                        setRepeatPassword(e.target.value);
                        setPasswordError(null);
                      }}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                    />
                  </div>
                </div>

                {passwordError && (
                  <p className="mt-3 text-sm font-medium text-red-600">
                    {passwordError}
                  </p>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={cancelPasswordEdit}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePassword}
                    disabled={isSavingPassword}
                    className="rounded-lg bg-gray-900 px-4 h-[52px] text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-60 cursor-pointer"
                  >
                    {isSavingPassword ? "Saving…" : "Save Password"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Manage account */}
        {/* <div className="mt-20 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Manage account
          </h2>

          <div className="mt-6 flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-red-600">
                Delete Profile Permanently
              </p>
              <p className="mt-1 text-sm text-gray-400">
                This action is irreversible; we cannot recover your data after
                account deletion.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="shrink-0 text-sm font-medium text-red-600 hover:underline cursor-pointer"
            >
              Delete Profile
            </button>
          </div>
        </div> */}
      </div>

      {/* Delete confirmation modal */}
      {deleteOpen && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setDeleteOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              Are you sure you <br /> want to delete your profile?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Deleted accounts can't be refunded. Please contact support before
              deleting, this action is permanent and will remove all your data,
            </p>
            <div>
              <label
                htmlFor="current_password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <Input
                id="current_password"
                type="password"
                placeholder="Enter Password"
                value={modalCurrentPassword}
                onChange={(e) => {
                  setModalCurrentPassword(e.target.value);
                  setPasswordError(null);
                }}
                className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 h-[52px] text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
              />
            </div>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteOpen(false);
                  setDeleteConfirmText("");
                }}
                className="rounded-lg w-[116px] h-[52px] text-sm font-medium text-gray-600 bg-[#F3F4F6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-[#CB121D] w-[116px] h-[52px] text-sm font-medium text-white transition-colors hover:bg-red-700  cursor-pointer"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
