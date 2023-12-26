"use client"
import {Card, CardBody} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {useState} from "react";
import {CheckIcon, HeartIcon, NotificationIcon} from "@/components/icons";
import {Chip} from "@nextui-org/chip";

export default function BlogPage() {
    const [liked, setLiked] = useState(false)
    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <Card
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[693.34px]"
                    shadow="sm"
                >
                    <CardBody>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 justify-center">
                            <div className="relative col-span-6 md:col-span-4">
                                <Image
                                    alt="Album cover"
                                    className="object-cover"
                                    height={200}
                                    shadow="md"
                                    src="https://nextui.org/images/album-cover.png"
                                    isBlurred
                                    isZoomed
                                    width="100%"
                                />
                            </div>
                            <div className="flex flex-col col-span-6 md:col-span-8">
                                <div className={"flex justify-between"}>
                                    <div className="flex flex-row gap-3">
                                        <Chip
                                            startContent={<CheckIcon size={18}/>}
                                            variant="faded"
                                            color="success"
                                        >
                                            Chip
                                        </Chip>
                                        <Chip
                                            endContent={<NotificationIcon size={18}/>}
                                            variant="flat"
                                            color="secondary"
                                        >
                                            Chip
                                        </Chip>
                                    </div>
                                    <Button
                                        isIconOnly
                                        className=" text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                        radius="full"
                                        variant="light"
                                        onPress={() => setLiked((v) => !v)}
                                    >
                                        <HeartIcon
                                            className={liked ? "[&>path]:stroke-transparent" : ""}
                                            fill={liked ? "currentColor" : "none"}
                                        />
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-default-900 text-3xl font-bold">标题</p>
                                    <p className="text-default-500 text-sm overflow-hidden overflow-ellipsis line-clamp-4">Artist
                                        overflow-hiddenoverflow-hiddenoverflow-hiddenoverflow-hiddenoverflow-hiddenNameArtist
                                        NameArtist NameArtist NameArtist NameArtist NameArtist NameArtist NameArtist
                                        NameArtist NameArtist NameArtist NameArtist NameArtist NameArtist NameArtist
                                        Name</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
