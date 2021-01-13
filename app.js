const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const Playlist = require("./models/playlist");
const Artist = require("./models/artist");
const Album = require("./models/album");
const User = require("./models/user");
const Track = require("./models/track");
const sequelize = require("./database/sequelize");
const UserRoutes = require("./routes/User");
const { Op } = Sequelize;
app.use(bodyParser.json());
const connection = sequelize;

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been  established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
  });

Artist.hasMany(Album, {
  foreignkey: "ArtistId",
});

Album.belongsTo(Artist, {
  foreignkey: "ArtistId",
});

Playlist.hasMany(Track, {
  //  through: "playlist_tracks",
  foreignkey: "PlaylistId",
  timestamp: false,
});

// Playlist.belongsToMany(Track, {
//     //  through: "playlist_tracks",
//     foreignkey: "PlaylistId",
//     timestamp: false,
//   });

// Track.belongsToMany(PlayList, {
//       through: "playlist_tracks",
//     foreignkey: "TrackId",
//     timestamp: false,
//   });

app.use("/", UserRoutes);
app.get("/users", function (req, res) {
  let { name } = req.query;
  let filter = {};
  if (name) {
    filter = {
      where: {
        name: {
          [Op.like]: `${name}%`,
        },
      },
    };
  }
  User.findAll(filter)
    .then((playlists) => {
      res.status(200).json(playlists);
    })
    .catch((err) => console.log(err));
});

app.get("/user/:id", function (req, res) {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => console.log(err));
});

app.get("/api/playlist", function (req, res) {
  Playlist.findAll().then((playlists) => {
    res.status(200).json(playlists);
  });
});

app.get("/api/playlist/:id", function (req, res) {
  let { id } = req.params;
  Playlist.findByPk(id, {
    include: [Track],
  })
    .then((playlist) => {
      if (playlist) {
        res.status(200).json(playlist);
      } else {
        res.status(400).json({ message: "error" });
      }
    })
    .catch((err) => console.log(err));
});

app.get("/artists/:id", function (req, res) {
  let { id } = req.params;
  Artist.findByPk(id)
    .then((artist) => {
      if (artist) {
        res.status(200).json(artist);
      } else {
        res.status(400).json({ message: "error" });
      }
    })
    .catch((err) => console.log(err));
});

app.get("/api/artist/:id", function (req, res) {
  let { id } = req.params;
  Artist.findByPk(id, {
    include: [Album],
  })
    .then((artist) => {
      if (artist) {
        res.status(200).json(artist);
      } else {
        res.status(400).json({ message: "error" });
      }
    })
    .catch((err) => console.log(err));
});

app.get("/api/albums/:id", function (req, res) {
  let { id } = req.params;
  Album.findByPk(id, {
    include: [Artist],
  })
    .then((album) => {
      if (album) {
        res.status(200).json(album);
      } else {
        res.status(400).json({ message: "error" });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/api/artists", (req, res) => {
  Artist.create({
    name: req.body.name,
  })
    .then(
      (ar) => {
        res.json(ar);
      },
      (errors) => {
        res.status(400).json({
          errors: errors.errors.map((e) => {
            return { attributes: e.path, message: e.message };
          }),
        });
      }
    )
    .catch((err) => console.log(err));
});

app.delete("/api/playlist/:id", (req, res) => {
  let { id } = req.params;
  Playlist.findByPk(id)
    .then((playlist) => {
      if (playlist) {
        playlist
          .setTracks([])
          .then((playlist) => {
            playlist
              .destroy()
              .then((r) => {
                res.status(204).json(r);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        return res.status(400).json({ message: "not found" });
      }
    })
    .catch((error) => console.log(error));
});
app.listen(8001, () => {
  console.log("listening on port 8001");
});
