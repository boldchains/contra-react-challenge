import React, { Suspense, useState, useEffect } from "react";

const fackData = [
  {
    id: 0,
    name: "fam",
    email: "fam848@gmail.com"
  },
  {
    id: 1,
    name: "james lin",
    email: "jameslin848@gmail.com"
  },
  {
    id: 3,
    name: "david",
    email: "david29@gmail.com"
  }
];

const SuspensefulUserProfile = ({ userId }) => {
  const [data, setData] = useState({});

  const fetchUserProfile = (userId) => {
    return new Promise((resolve, reject) => {
      const user = fackData.find((user) => user.id === userId);
      if (user) {
        resolve(user);
      } else {
        reject(`Invalid User Id: ${userId}`);
      }
    });
  };

  useEffect(() => {
    fetchUserProfile(userId)
      .then((profile) => setData(profile))
      .catch((e) => {
        console.log(e);
      });
  }, [userId, setData]);

  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <UserProfile data={data} />
    </Suspense>
  );
};

const UserProfile = ({ data }) => {
  return (
    <>
      <h1>{data.name}</h1>
      <h2>{data.email}</h2>
    </>
  );
};

const UserProfileList = () => (
  <>
    <SuspensefulUserProfile userId={1} />
    <SuspensefulUserProfile userId={2} />
    <SuspensefulUserProfile userId={3} />
  </>
);

export default UserProfileList;
