export type Ratings = {
    cleanliness: number;
    staff: number;
    location: number;
    amenities: number;
};

export type HotelRating = Ratings & {
    average_rating: string;
    number_comments: number;
};
