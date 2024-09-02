'use client';
import React, { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/crousel';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';
import getNameLetter from '../../lib/getNameLetter';
import { HttpStatusCode } from 'axios';
import { BASE_URL } from '../../lib/constant';
import { Star } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

export const ReviewTestimonial = () => {
    const [api, setApi] = React.useState();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [data, setData] = React.useState([]);

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true }),
    );

    useEffect(() => {
        const callTestimonial = async () => {
            const response = await fetch(`${BASE_URL}/api/testimonials`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (result.statusCode === HttpStatusCode.Ok) {
                setData(result.data.testimonials);
            }
        };
        callTestimonial();
    }, []);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section className="container max-w-screen-2xl mx-auto my-10 xl:my-20">
            <div className="mx-5 md:mx-auto md:w-[70%] py-5 text-center">
                <h4 className="text-3xl md:text-6xl py-2 font-[Roboto] font-bold text-center  px-8">
                    Our Client Testimonials
                </h4>
            </div>
            <Carousel
                className="mx-5 md:mx-auto md:w-[90%]"
                setApi={setApi}
                plugins={[plugin.current]}
                opts={{ loop: true, align: 'start' }}
            >
                <CarouselContent className="-ml-1">
                    {data.map((item) => (
                        <CarouselItem
                            key={item._id}
                            className="pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1 h-full">
                                <Card className="h-full">
                                    <CardHeader className="py-3">
                                        <div className="flex items-center justify-between  gap-4">
                                            <div className="flex items-center space-x-2">
                                                <Avatar className="hidden h-12 w-12  sm:flex">
                                                    <AvatarImage
                                                        src="/avatars/01.png"
                                                        alt="Avatar"
                                                    />
                                                    <AvatarFallback>
                                                        {getNameLetter(
                                                            item.name,
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.designation}
                                                    </p>
                                                </div>
                                            </div>

                                            <Avatar className="h-12 w-12">
                                                <AvatarImage
                                                    src="/google-icon.svg"
                                                    alt="Avatar"
                                                />
                                                <AvatarFallback>
                                                    {getNameLetter(item.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-1">
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map(
                                                (_, starIndex) => (
                                                    <Star
                                                        className={cn(
                                                            'h-5 w-5',
                                                            starIndex <
                                                                item.stars
                                                                ? 'text-yellow-500 fill-current'
                                                                : '',
                                                        )}
                                                        key={`star-${item._id}-${starIndex}`}
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-2">
                                            {item.review}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="md:hidden flex justify-center my-5">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={`dot-${index}`}
                            onClick={() => api && api.scrollTo(index - 1)}
                            className={cn(
                                'h-2 w-2 rounded-full mx-1',
                                index === current ? 'bg-primary' : 'border',
                            )}
                        ></button>
                    ))}
                </div>
            </Carousel>
        </section>
    );
};
