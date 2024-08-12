import { useState } from "react";
import {
  AlertDialog,
  
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteRestaurant } from "@/redux/actions/deleteRestaurantAction";

export const DeleteRestaurant = ({ id }: { id: string }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.retaurant);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteRestaurant(id)).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        setOpenDialog(false);
      }
    });
  };
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button
          className="h-8 w-full justify-start flex px-2 "
          variant={"ghost"}
        >
          <span className="text-sm mt-[2px]">Delete restaurant</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className={`gap-2 ${loading ? "pointer-events-none" : ""}`}
            onClick={handleDelete}
          >
            Contitue{" "}
            {loading && (
              <>
                <LoaderCircle className="w-5 animate-spin" />
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
