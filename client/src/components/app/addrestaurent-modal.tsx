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
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { restaurantSchema } from "@/lib/schemas/restaurant.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const {
    setValue,
    watch,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      location: "",
      description: "",
      contactNum: "",
      pincode: "",
    },
  });
  const [menu, setMenu] = useState<{
    title: string;
    description: string;
    menuImg: FileList | File | null;
  }>({ title: "", description: "", menuImg: null });

  const handleMenuAdd = () => {
    const copyMenu = { ...menu, image: menu.menuImg };
    if (getValues("menu")) {
      setValue("menu", [
        ...getValues("menu"),
        copyMenu as unknown as {
          description: string;
          image: File;
          title: string;
        },
      ]);
    } else {
      setValue("menu", [
        copyMenu as unknown as {
          description: string;
          image: File;
          title: string;
        },
      ]);
    }
    trigger("menu");

    setMenu({ title: "", description: "", menuImg: null });
  };
  const handleMenuTxt = (e: ChangeEvent<HTMLInputElement>) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };
  const handleMenuImage = (e: ChangeEvent<HTMLInputElement>) => {
    setMenu({ ...menu, [e.target.name]: e?.target?.files?.[0] });
  };
  const handleAddRestaurant = (value: z.infer<typeof restaurantSchema>) => {value};
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
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[56%] lg:min-w-[44%] xl:min-w-[38%] overflow-y-auto h-[620px] scrollbar-thin  overflow-x-hidden ">
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
          <AlertDialogDescription className="overflow-x-hidden ">
            <form
              action=""
              onSubmit={handleSubmit(handleAddRestaurant)}
              className="flex flex-col overflow-x-hidden scrollbar-none px-1"
            >
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="">Restaurant name</label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setValue("name", e.target.value);
                      trigger("name");
                    }}
                    value={watch("name")}
                    className="capitalize text-black w-full"
                    placeholder="enter restaurant name.."
                  />
                  <span className="text-red-600 h-3  text-sm">
                    {errors && errors.name && errors.name?.message}
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="">Restaurant location</label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setValue("location", e.target.value);
                      trigger("location");
                    }}
                    value={watch("location")}
                    className="capitalize text-black w-full"
                    placeholder="enter location.."
                  />
                  <span className="text-red-600 h-3  text-sm">
                    {errors && errors.location && errors.location?.message}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="">Contact number</label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setValue("contactNum", e.target.value);
                      trigger("contactNum");
                    }}
                    value={watch("contactNum")}
                    className="capitalize text-black w-full"
                    placeholder="enter contact number"
                  />
                  <span className="text-red-600 h-3  text-sm">
                    {errors && errors.contactNum && errors.contactNum?.message}
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                  <label htmlFor="">place pincode</label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setValue("pincode", e.target.value);
                      trigger("pincode");
                    }}
                    value={watch("pincode")}
                    className="capitalize text-black w-full"
                    placeholder="enter zipcode"
                  />
                  <span className="text-red-600 h-3  text-sm">
                    {errors && errors.pincode && errors.pincode?.message}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Textarea
                  placeholder="restaurant description"
                  className="resize-none"
                  onChange={(e) => {
                    setValue("description", e.target.value);
                    trigger("description");
                  }}
                  value={watch("description")}
                />
                <span className="text-red-600 h-3  text-sm">
                  {errors && errors.description && errors.description?.message}
                </span>
              </div>
              <div className="w-full flex flex-col gap-1">
                <input
                  type="file"
                  id="restaurantImage"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const filesArray = Array.from(
                      e.target.files as unknown as unknown[]
                    );
                    if (getValues("images")) {
                      console.log(
                        "🚀 ~ AddRestaurantModal ~ filesArray: -1",
                        filesArray
                      );
                      setValue("images", [
                        ...getValues("images"),
                        ...(filesArray as unknown as File[]),
                      ]);
                    } else {
                      setValue("images", [
                        ...(filesArray as [File, ...File[]]),
                      ]);
                    }
                    trigger("images");
                  }}
                />
                <label
                  htmlFor="restaurantImage"
                  className="w-full min-h-20 border rounded-md flex items-center justify-center flex-col gap-1 py-2 cursor-pointer"
                >
                  <img src="/images/upload_img.svg" className="h-16" alt="" />
                  <span>Upload restaurant related images</span>
                </label>
                {watch("images") && watch("images")?.length > 0 && (
                  <>
                    <div className={`h-36 w-full relative`}>
                      <div className="absolute top-0 left-0 space-x-3 w-full whitespace-nowrap gap-2 mt-3 overflow-x-auto scrollbar-thin ">
                        {watch("images")?.map((imageFile, id) => (
                          <div
                            key={`${JSON.stringify(imageFile) + id}`}
                            className="inline-block h-32 w-24 border rounded-md relative overflow-hidden "
                          >
                            <div className="absolute right-1 top-1 bg-black/55 text-white cursor-pointer rounded-full size-6 flex justify-center items-center">
                              <X
                                className="w-4 "
                                onClick={() => {
                                  setValue(
                                    "images",
                                    getValues("images").filter(
                                      (_, Idx) => id !== Idx
                                    ) as [File, ...File[]]
                                  );
                                }}
                              />
                            </div>
                            <img
                              src={URL.createObjectURL(imageFile)}
                              className="w-full h-full object-cover "
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <span className="text-red-600 h-3  text-sm">
                  {errors && errors.images && errors.images?.message}
                </span>
              </div>
              <div className="w-full  grid-grid-cols-1 rounded-sm border p-2">
                <div className="w-full flex flex-col gap-2">
                  <Input
                    className="w-full"
                    placeholder="menu"
                    value={menu.title}
                    name="title"
                    onChange={handleMenuTxt}
                  />
                  <div className="w-full flex gap-2">
                    <Textarea
                      name="description"
                      value={menu.description}
                      placeholder="menu description "
                      className="resize-none w-full"
                      rows={1}
                      onChange={
                        handleMenuTxt as unknown as ChangeEventHandler<HTMLTextAreaElement>
                      }
                    />
                    <input
                      type="file"
                      name="menuImg"
                      className="hidden"
                      id="menuImg1"
                      onChange={handleMenuImage}
                    />
                    <label
                      htmlFor="menuImg1"
                      className="min-w-24 h-24 flex flex-col gap-1 justify-center items-center rounded-md border cursor-pointer"
                    >
                      {!menu?.menuImg ? (
                        <>
                          <UploadCloudIcon size={40} />
                          <span className="text-[12px]">upload image</span>
                        </>
                      ) : (
                        <>
                          <img
                            src={URL.createObjectURL(
                              menu?.menuImg as Blob | MediaSource
                            )}
                            className="h-20"
                            alt=""
                          />
                        </>
                      )}
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="h-7 text-[13px]"
                      type="button"
                      onClick={handleMenuAdd}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <span className="text-red-600 h-3  text-sm">
                  {errors && errors.menu && errors.menu?.message}
                </span>
              </div>
              {watch("menu") && watch("menu")?.length > 0 && (
                <>
                  <div className="w-full relative h-36 ">
                    <div className="absolute top-0 left-0 space-x-3 w-full whitespace-nowrap gap-2 mt-3 overflow-x-auto scrollbar-thin">
                      {watch("menu")?.map((mnu, index) => (
                        <div
                          className="inline-block h-32 w-24 border rounded-md relative overflow-hidden"
                          key={(JSON.stringify(menu) + "-", index)}
                        >
                          <div className="absolute right-1 top-1 bg-black/65 text-white cursor-pointer rounded-full size-6 flex justify-center items-center">
                            <X
                              className="w-4"
                              onClick={() =>
                                setValue(
                                  "menu",
                                  getValues("menu").filter(
                                    (_, idx) => index !== idx
                                  )
                                )
                              }
                            />
                          </div>
                          <img
                            src={URL.createObjectURL(mnu?.image)}
                            className="w-full h-full object-cover "
                            alt="IM"
                          />
                          <div className="w-full absolute px-2 pb-2  line-clamp-1 bg-black/45 left-0 bottom-0">
                            <span className="line-clamp-1 text-white font-semibold">
                              {mnu.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="w-full mt-2 justify-end flex border-y py-2">
                <Button type="submit">Submit details</Button>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
