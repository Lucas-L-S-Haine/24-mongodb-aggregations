db.movies.aggregate(
  [
    { $match:
      { $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $nin: ["Crime", "Horror"] } },
        { rated: { $in: ["G", "PG"] } },
        { languages: { $all: ["English", "Spanish"] } },
      ] },
    },
  ],
);
