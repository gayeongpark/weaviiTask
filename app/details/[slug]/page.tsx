"use client";
import AristDetailImage from "@/components/AristDetailImage";
import React, { useEffect, useState } from "react";

interface Album {
  name: string;
  id: string;
  image: string;
}

interface Tracks {
  name: string;
  id: string;
  preview_url: string;
  // artist: Artists;
}

// interface Artists {
//   name: string;
// }

export default function Details({ params }: { params: { slug: string } }) {
  const apiUrl = process.env.API_URL2 as string;
  const [artistsDetails, setArtistsDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
                  {
                    queryArtists {
                      name
                      id
                      image
                      albums {
                        name
                        id
                        image 
                        tracks {
                          id
                          name
                          preview_url
                          artists {
                            name
                          }
                        }
                      }
                    }
                  }
                `,
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setArtistsDetails(result.data.queryArtists);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex justify-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {artistsDetails
        ?.filter((artist) => artist.id === params.slug)
        .map((artist) => (
          <div key={artist.id}>
            <div className="flex min-w-0 gap-x-4">
              {artist.image !== "" ? (
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-48 w-48 sm:h-64 sm:w-64 lg:h-72 lg:w-72 mb-5 flex-none rounded-md bg-gray-50"
                />
              ) : (
                <AristDetailImage />
              )}
              <h1 className="flex items-center text-4xl sm:text-5xl lg:text-6xl">
                {artist.name}
              </h1>
            </div>
            <div className="flex min-w-0 gap-x-4">
              <h1 className="text-white text-3xl sm:text-4xl mt-6 mb-4">
                Albums
              </h1>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {artist.albums.map((album: Album) => (
                <li
                  key={album.id}
                  className="flex justify-between gap-x-4 sm:gap-x-6 py-3 sm:py-5 lg:py-6"
                >
                  <div>
                    <div className="flex min-w-0 gap-x-2 sm:gap-x-4">
                      <img
                        src={album.image}
                        alt={album.name}
                        className="h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 flex-none rounded-full bg-gray-50"
                      />
                      <div className="flex items-center">
                        <p className="font-semibold text-base md:text-3xl sm:text-lg text-white">
                          {album.name}
                        </p>
                      </div>
                    </div>
                    <div className="m-8">
                      <h2 className="text-white text-lg sm:text-xl font-semibold mb-2">
                        Tracks
                      </h2>
                      <ul role="list" className="divide-y divide-gray-100">
                        {artist?.album?.tracks.map((track: Tracks) => (
                          <li
                            key={track.id}
                            className="flex justify-between py-2 sm:py-3 lg:py-4"
                          >
                            <div className="flex items-center">
                              <p className="text-base sm:text-lg text-white">
                                {track.name}
                              </p>
                            </div>
                            <div>
                              <audio src={track.preview_url} controls />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
