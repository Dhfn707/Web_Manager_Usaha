import React, { useState } from "react";
import Button from "../components/Button";

const Home = () => {

  const [color, setColor] = useState("#000000");

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <input type="color" name="" id="" value={color} onChange={(e)=> setColor(e.target.value)}/>
      <Button color={color} name="Kirim"/>
    </div>
  );
};

export default Home;
