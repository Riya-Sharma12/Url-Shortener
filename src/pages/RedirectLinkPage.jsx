// import React from 'react'
// import {useParams} from "react-router-dom";
// import { storeClicks } from '@/db/apiUrls';
// import useFetch from '@/hooks/useFetch';
// import {BarLoader} from "react-spinners";
// import {getLongUrl} from "@/db/apiUrls";
// import {useEffect} from "react";

// const RedirectLinkPage = () => {
//   const {id} = useParams();

//   const {loading, data, fn} = useFetch(getLongUrl, id);

//   const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
//     id: data?.id,
//     originalUrl: data?.original_url,
//   });

//   useEffect(() => {
//     fn();
//   }, [id]);

//   useEffect(() => {
//     if (!loading && data) {
//       fnStats();
//     }
//   }, [loading]);

//   if (loading || loadingStats) {
//     return (
//       <>
//         <BarLoader width={"100%"} color="#36d7b7" />
//         <br />
//         Redirecting...
//       </>
//     );
//   }

//   return null;
// };

// export default RedirectLinkPage;


import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getLongUrl } from '@/db/apiUrls';
import { storeClicks } from '@/db/apiClicks';
import useFetch from '@/hooks/useFetch';
import { BarLoader } from "react-spinners";

const RedirectLinkPage = () => {
  const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLinkPage;
