import { FaStar } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"

export const ItemCard = ()=>{
    return (
        <div className="flex w-64  flex-wrap justify-center   flex-col gap-2 m-2 p-2 border-2 border-gray-300 cursor-pointer rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
           
            <div className="flex flex-row flex-wrap w-full h-48  ">
                  {/* <div className="   items-center rounded-full border px-2.5 py-0.5  ">Electronics</div> */}
                 <img className="  w-full h-48  transition-transform duration-300  " src="/images/item-1.png" ></img>
                </div> 
             
             <div className="flex flex-col"> 
                <div className="text-3xl">Action 2</div>
                <div className="text-1xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, beatae!</div>
            </div>
            <div className="flex flex-row justify-start  gap-1 "> 
                <FaStar className="text-yellow-600"></FaStar>
                <div  >4.5</div>
                <div >|</div>
                <div >100+ Ratings</div>
                </div>

            <div className="flex flex-row gap-2 justify-start">
                <div className="text-bold p-0.5 pl-2 pr-2 rounded bg-amber-200 ">Black</div>
                <div className="text-bold p-0.5 pl-2 pr-2 rounded bg-amber-200  ">28 GB</div>
                <div className="text-bold p-0.5 pl-2 pr-2 rounded bg-amber-200 ">24 MP</div>
            </div>

            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-end"><span className="font-bold text-2xl text-blue-600">$45</span>/day</div>
                 <div className="flex flex-row justify-center items-center"> <button className="flex gap-1 items-center bg-blue-600 text-white p-2 rounded-lg">  <FaCartShopping></FaCartShopping> Add to Cart</button></div>
            </div>
        </div>

    )
}