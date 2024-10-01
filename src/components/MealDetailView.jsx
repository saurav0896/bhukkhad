/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { getRequest } from "../services/axiosConfig";
import Skeleton from "react-loading-skeleton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MealDetailView() {
  const [product, setProduct] = useState({});
  const [ingredient, setIngredient] = useState([]);

  const reviews = { href: "#", average: 4, totalCount: 117 };

  const [isLoading, setIsLoading] = useState(true);
  const [isShowMore, setIsShowMore] = useState(false);

  function prepareData(randomMeal) {
    setIngredient([]);
    let tempProduct = {
      name: randomMeal.strMeal,
      price: "$192",
      href: randomMeal.strSource,
      breadcrumbs: [
        { id: 1, name: randomMeal.strArea, href: "#" },
        { id: 2, name: randomMeal.strCategory, href: "#" },
      ],
      images: [
        {
          src: randomMeal.strMealThumb,
          alt: randomMeal.strMeal,
        },
      ],
      description: randomMeal.strInstructions,
      highlights: [],
    };

    for (let i = 1; i < 21; i++) {
      if (randomMeal["strIngredient" + i]) {
        let tempIngredient = randomMeal["strIngredient" + i];
        let measurement = randomMeal["strMeasure" + i];
        setIngredient((prevData) => [...prevData, tempIngredient]);
        tempProduct.highlights.push(`${measurement} of ${tempIngredient}`);
      } else {
        break;
      }
    }

    setProduct(tempProduct);
  }

  async function fetchRandomMeal() {
    try {
      setIsLoading(true);
      let tempCategories = await getRequest("random.php");
      prepareData(tempCategories.data.meals[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 overflow-hidden">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Random Recipe <span aria-hidden="true">&rarr;</span>
        </h2>
        <button type="button" onClick={fetchRandomMeal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>

      <nav aria-label="Breadcrumb">
        {isLoading ? (
          <div className="flex">
            <Skeleton width={60} /> / <Skeleton width={90} /> /{" "}
            <Skeleton width={130} />
          </div>
        ) : (
          <>
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </>
        )}
      </nav>

      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl min-h-72 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-2 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          {isLoading ? (
            <Skeleton width={300} height={500} />
          ) : (
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-1 aspect-w-3 overflow-hidden rounded-lg">
            {isLoading ? (
              <Skeleton width={300} height={300} />
            ) : (
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <div className="aspect-h-1 aspect-w-3 overflow-hidden rounded-lg">
            {isLoading ? (
              <Skeleton width={300} height={300} />
            ) : (
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
        </div>
        <div className="aspect-h-2 aspect-w-4 lg:aspect-h-2 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          {isLoading ? (
            <Skeleton width={300} height={500} />
          ) : (
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          {isLoading ? (
            <Skeleton width={500} />
          ) : (
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          )}
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            <>
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>
            </>
          )}
          {/* Reviews */}
          <div className="mt-6">
            {isLoading ? (
              <>
                <Skeleton width={300} />
                <Skeleton count={2} />
              </>
            ) : (
              <>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </>
            )}
          </div>

          <form className="mt-10">
            {/* Colors */}
            {isLoading ? (
              <>
                <Skeleton width={300} />
                <Skeleton count={2} />
                <Skeleton height={50} />
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-lg text-gray-900 font-bold">
                    Tag :
                  </h3>

                  <div className="flex">
                    {product.strCategory == "Vegan" ||
                    product.strCategory == "Vegetarian" ? (
                      <span className=" p-1 text-sm text-green-600">Veg</span>
                    ) : (
                      <span className=" p-1 text-sm text-red-600">Non Veg</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </>
            )}
          </form>

          {/* Ingredients */}
          <div className="mt-6 ">
            {isLoading ? (
              <>
                <Skeleton width={200} />
                <div className="flex flex-row flex-wrap">
                  {[...Array(10).keys()].map((el) => (
                    <Skeleton
                      key={el}
                      circle
                      height={60}
                      width={60}
                      containerClassName="avatar-skeleton"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold">Ingredients Used : </h3>
                <div className="m-1 py-2 flex flex-wrap">
                  {ingredient.map((item, i) => (
                    <img
                      key={i}
                      src={`https://www.themealdb.com/images/ingredients/${item}.png`}
                      className="h-16 w-16 object-cover object-center rounded-full p-1 m-1 bg-indigo-200"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          {isLoading ? (
            <>
              <Skeleton count={5} />
              <Skeleton width={300} className="mt-8" />
              <Skeleton count={6} />
            </>
          ) : (
            <>
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900 whitespace-pre-line">
                    {isShowMore
                      ? product.description
                      : product.description.substring(0, 500)}
                    <button
                      onClick={() => {
                        setIsShowMore(!isShowMore);
                      }}
                      className="font-bold text-sm py-3"
                    >
                      {isShowMore ? " Show less" : "... Show more"}
                    </button>
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Measurements
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
