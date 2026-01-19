
import { Drawer, DrawerContent } from '../ui/drawer'

function RootDrawer({ open, setOpen, children }: { open?: boolean; setOpen?: (open: boolean) => void; children?: React.ReactNode }) {
  return (
    <div>
        <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="max-w-2xl! w-full">
        {children}
     </DrawerContent>
    </Drawer>
    </div>
  )
}

export default RootDrawer
