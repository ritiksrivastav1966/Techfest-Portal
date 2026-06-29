const Registrations = require('./../Models/registrationData');
const Events = require('./../Models/eventData');
const Users = require('./../Models/usersdata');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Reviews = require('./../Models/reviewData');
exports.createReview = catchAsync(async (req, res, next) => {

    const registration = await Registrations.findOne({
        user: req.user._id,
        event: req.params.eventId
    });
    if(!registration){
        return next(
    new AppError(
        'Register for the event before reviewing',
        400
    )
);

    }
    const event = await Events.findOne({_id:req.params.eventId});
    if(event.date > Date.now()){

    return next(
        new AppError(
            'Cannot review an upcoming event',
            400
        )
    );

}
    const review =
await Reviews.create({

    review: req.body.review,

    rating: req.body.rating,

    user: req.user._id,

    event: req.params.eventId

});

res.status(201).json({
    status:"success",
    message:"Review uploaded successfully"
});

});


exports.getReview = catchAsync(async(req,res,next)=>{
    const reviews = await Reviews.find({
        event:req.params.eventId
    }).populate(
        'user','name'
    );

    res.status(200).json({
        status:"success",
        data:{
            reviews
        }
    })
})

exports.editReview = catchAsync(
    async (req, res, next) => {

        const review =
            await Reviews.findById(
                req.params.id
            );

        if (!review) {

            return next(
                new AppError(
                    'No review found with that id',
                    404
                )
            );

        }

        if (
            review.user.toString()
            !==
            req.user._id.toString()
        ) {

            return next(
                new AppError(
                    'You can only edit your own reviews',
                    403
                )
            );

        }

        review.rating =
            req.body.rating
            || review.rating;

        review.review =
            req.body.review
            || review.review;

        await review.save();

        res.status(200).json({

            status: 'success',

            data: {
                review
            }

        });

    }
);