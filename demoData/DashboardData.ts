import j1 from "@/public/jobImage/j1.png";
import j2 from "@/public/jobImage/j2.png";
import j3 from "@/public/jobImage/j3.png";
import j4 from "@/public/jobImage/j4.png";

export const demoData = [
  {
    id: "1",
    full_name: "Leslie Alexander",
    email_address: "felicia.reid@example.com",
    enquiry_type: "maid",
    mobile_number: "+14882918803",
    createdAt: "2014-05-30T00:00:00Z",
    time: "2014-05-30T10:30:00Z",
    additional_information: "Website",
    status: "Pre Application",
    image_name: j1,
  },
  {
    id: "2",
    full_name: "Devon Lane",
    email_address: "bill.sanders@example.com",
    enquiry_type: "employer",
    mobile_number: "+18102458249",
    createdAt: "2015-05-27T00:00:00Z",
    time: "2015-05-27T14:15:00Z",
    additional_information: "Phone Call",
    status: "Applied",
    image_name: j2,
  },
  {
    id: "3",
    full_name: "Eleanor Pena",
    email_address: "georgia.young@example.com",
    enquiry_type: "maid",
    mobile_number: "+14882918803",
    createdAt: "2012-02-11T00:00:00Z",
    time: "2012-02-11T09:00:00Z",
    additional_information: "Facebook",
    status: "Pre Application",
    image_name: j3,
  },
  {
    id: "4",
    full_name: "Kathryn Murphy",
    email_address: "jessica.hanson@example.com",
    enquiry_type: "employer",
    mobile_number: "+14884608141",
    createdAt: "2014-01-14T00:00:00Z",
    time: "2014-01-14T16:45:00Z",
    additional_information: "Email",
    status: "Applied",
    image_name: j4,
  },
  {
    id: "5",
    full_name: "Robert Fox",
    email_address: "nathan.roberts@example.com",
    enquiry_type: "maid",
    mobile_number: "+14882634865",
    createdAt: "2014-08-30T00:00:00Z",
    time: "2014-08-30T11:20:00Z",
    additional_information: "WhatsApp",
    status: "Pre Application",
    image_name: j1,
  },
  {
    id: "6",
    full_name: "Ronald Richards",
    email_address: "tanya.hill@example.com",
    enquiry_type: "employer",
    mobile_number: "+14884145917",
    createdAt: "2016-09-18T00:00:00Z",
    time: "2016-09-18T13:30:00Z",
    additional_information: "Website",
    status: "Pending",
    image_name: j2,
  },
  {
    id: "7",
    full_name: "Bessie Cooper",
    email_address: "kenzi.lawson@example.com",
    enquiry_type: "maid",
    mobile_number: "+19143008346",
    createdAt: "2013-12-10T00:00:00Z",
    time: "2013-12-10T08:00:00Z",
    additional_information: "Referral",
    status: "Pre Application",
    image_name: j3,
  },
  {
    id: "8",
    full_name: "Cameron Williamson",
    email_address: "willie.jennings@example.com",
    enquiry_type: "employer",
    mobile_number: "+14882634869",
    createdAt: "2013-10-08T00:00:00Z",
    time: "2013-10-08T15:45:00Z",
    additional_information: "Instagram",
    status: "Pre Application",
    image_name: j4,
  },
  {
    id: "9",
    full_name: "Wade Warren",
    email_address: "dolores.chambers@example.com",
    enquiry_type: "maid",
    mobile_number: "+14882820363",
    createdAt: "2013-07-27T00:00:00Z",
    time: "2013-07-27T10:30:00Z",
    additional_information: "Email",
    status: "Inactive",
    image_name: j1,
  },
  {
    id: "10",
    full_name: "Ralph Edwards",
    email_address: "nevaeh.simmons@example.com",
    enquiry_type: "employer",
    mobile_number: "+18102448985",
    createdAt: "2017-08-16T00:00:00Z",
    time: "2017-08-16T14:20:00Z",
    additional_information: "Website",
    status: "Applied",
    image_name: j4,
  },
  {
    id: "11",
    full_name: "Marvin McKinney",
    email_address: "tim.jennings@example.com",
    enquiry_type: "maid",
    mobile_number: "+19143008184",
    createdAt: "2016-09-23T00:00:00Z",
    time: "2016-09-23T09:15:00Z",
    additional_information: "Phone Call",
    status: "Pre Application",
    image_name: j2,
  },
];

export const statuse = [
  {
    value: "Pre Application",
    color: "bg-green-500/15 text-green-600",
  },
  {
    value: "Applied",
    color: "bg-purple-500/15 text-purple-600",
  },
  {
    value: "Inactive",
    color: "bg-red-500/15 text-red-600",
  },
  {
    value: "Pending",
    color: "bg-orange-500/15 text-orange-600",
  },
];

export const applicationDateOptions = [
  {
    value: "application_date",
    label: "Application Date",
  },
  {
    value: "last_login",
    label: "Last Login Date",
  },
  {
    value: "recent_access",
    label: "Recent Access",
  },
];

export const typeFilters = [
  {
    value: "midwest_elite_nannies",
    label: "Midwest Elite Nannies",
  },
  {
    value: "admin",
    label: "ADMIN",
  },
  {
    value: "user",
    label: "USER",
  },
];

export const locationFilters = [
  {
    value: "dc_metro",
    label: "DC Metro Area",
  },
  {
    value: "new_york",
    label: "New York",
  },
  {
    value: "miami",
    label: "Miami",
  },
  {
    value: "iowa",
    label: "Iowa",
  },
  {
    value: "other",
    label: "Other Locations",
  },
];
