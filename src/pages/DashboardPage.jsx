import React from "react";
import { useEffect, useState } from "react";
import {Filter} from "lucide-react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrl } from "@/db/apiClicks";
import Linkcard from "@/components/Linkcard";
import CreateLink from "@/components/CreateLink";


const DashboardPage = () => {

  const[searchQuery , setSearchQuery] = useState("") ;
  const {user} = UrlState();
 const {loading , error , data:urls , fn: fnUrls} =  useFetch(getUrls , user?.id);
 const {
  loading: loadingClicks,
  data: clicks,
  fn: fnClicks,
} = useFetch(
  getClicksForUrl,
  urls?.map((url) => url.id)
);

useEffect(() => {
  fnUrls();
}, []);

useEffect(() => {
  if(urls?.length)  fnClicks();
}, [urls?.length]);

const filteredUrls = urls?.filter((url) =>
  url.title.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="flex flex-col gap-8">
       {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Links Created</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{urls?.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{clicks?.length}</p>
        </CardContent>
      </Card>
    </div>
    <div className="flex justify-between">
      <h1 className="text-4xl font-extrabold">My Links</h1>
      {/* <Button>Create Links</Button> */}
      <CreateLink/>
    </div>
    <div  className="relative">
     <Input
     type="text" placeholder="Fiter Links.."
     onChange={()=>{
         setSearchQuery(e.target.value);
     }}
     />
      <Filter className="absolute top-2 right-1 p-1" />
      </div>
     {error && <Error message={error?.message} />}
     {(filteredUrls || []).map((url, i) => (
        <Linkcard key={i} url={url} fetchUrls={fnUrls} />
      ))}
       
     
    </div>
  );
};

export default DashboardPage;
