import { UploadCloudIcon, X } from "lucide-react";
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
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

export const AddRestaurantModal = () => {
  const removeHashValue = (hashToRemove: string): void => {
    const currentHash = window.location.hash;
    if (currentHash === hashToRemove) {
      window.history.replaceState(null, "", " ");
    }
  };
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  useEffect(() => {
    setOpenDialog(location.hash.includes("addrestaurant"));
  }, []);
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger>
        {" "}
        <Button
          className="h-8 ml-3"
          onClick={() => (window.location.hash = "#addrestaurant")}
        >
          <span className="text-sm mt-[2px]">Add restaurant</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[56%] lg:min-w-[44%] xl:min-w-[38%] overflow-hidden">
        <AlertDialogHeader>
          <div className="w-full flex justify-between item-center">
            <AlertDialogTitle>Add new restaurant</AlertDialogTitle>
            <AlertDialogCancel
              className="bg-transparent hover:bg-transparent w-auto p-0 border-none h-auto "
              onClick={() => removeHashValue("#addrestaurant")}
            >
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className="overflow-x-hidden">
            <form
              action=""
              className="flex flex-col overflow-x-hidden scrollbar-none"
            >
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="">Restaurant name</label>
                  <Input
                    type="text"
                    className="capitalize text-black w-full"
                    placeholder="enter restaurant name.."
                  />
                  <span className="text-red-600 h-3  text-sm"></span>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="">Restaurant location</label>
                  <Input
                    type="text"
                    className="capitalize text-black w-full"
                    placeholder="enter location.."
                  />
                  <span className="text-red-600 h-3  text-sm"></span>
                </div>
              </div>
              <div className="w-full grid-grid-cols-1 rounded-sm border p-2">
                <div className="w-full flex flex-col gap-2">
                  <Input className="w-full" placeholder="menu" />
                  <div className="w-full flex gap-2">
                    <Textarea
                      placeholder="menu description "
                      className="resize-none w-full"
                      rows={1}
                    />
                    <div className="min-w-24 h-24 flex flex-col gap-1 justify-center items-center rounded-md border">
                      <UploadCloudIcon size={40} />
                      <span className="text-[12px]">upload image</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="h-7 text-[13px]" type="button">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full relative h-36 ">
                <div className="absolute top-0 left-0 space-x-3 w-full whitespace-nowrap gap-2 mt-3 overflow-x-auto scrollbar-thin">
                  <div className="inline-block h-32 w-24 border rounded-md relative overflow-hidden">
                    <img
                      src=""
                      className="w-full h-full object-cover "
                      alt=""
                    />
                    <div className="w-full absolute px-2 pb-2  line-clamp-1 left-0 bottom-0">
                      <span className="line-clamp-1">
                        aslkdfjalksdjflkasdjfklasdfjlkjkl
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-1 justify-end flex">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
