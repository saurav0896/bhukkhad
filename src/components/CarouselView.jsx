/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import { useEffect, useState } from "react";
import { getRequest } from "../services/axiosConfig";
import Skeleton from 'react-loading-skeleton'



export default function CarouselView() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);


  async function fetchCategories() {
    try {
      setIsLoading(true);
      let tempCategories = await getRequest('categories.php');
      setCategories(tempCategories.data.categories);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 overflow-hidden border-b-2">
      {isLoading ? (
        <>
          <Skeleton width={200} />
          <div className="flex flex-row">
            {[...Array(10).keys()].map((el) => (
              <Skeleton
                key={el}
                circle
                height={160}
                width={160}
                containerClassName="avatar-skeleton"
              />
            ))}

          </div>
        </>) : (
        <>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Categories <span aria-hidden="true">&rarr;</span></h2>
          <div className="mt-6 flex overflow-y-auto scrollbar-hide ">
            {categories.map((category) => (
              <div key={category.idCategory} className="group relative mx-1">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-full shadow-md shadow-gray-500 bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-36 lg:w-36">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <div>
                    <h3 className="text-sm text-gray-800 font-bold">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {category.strCategory}
                      </a>
                    </h3>
                  </div>
                  {/* <p className="text-sm font-medium text-gray-900">{category.strCategoryDescription}</p> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
