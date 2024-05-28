import { makeStyles } from "@mui/material";
import Image from "next/image";
import Banner from "./components/Banner";
import CoinsTable from "./components/CoinsTable";

export default function Home() {


  return (
    <div>
      <Banner/>
      <CoinsTable/>
    </div>
  );
}
