db.movies.aggregate(
  [
    { $match:
      {
        languages: { $elemMatch: { $eq: "English" } },
      },
    },
    {
      $unwind: "$cast",
    },
    {
      $project:
      {
        cast: "$cast",
        "imdb.rating": "$imdb.rating",
      },
    },
    {
      $group:
      {
        _id: "$cast",
        numeroFilmes: { $sum: 1 },
        mediaIMDB: { $avg: "$imdb.rating" },
      },
    },
    {
      $project:
      {
        _id: "$_id",
        numeroFilmes: "$numeroFilmes",
        mediaIMDB: { $round: ["$mediaIMDB", 1] },
      },
    },
  ],
);
