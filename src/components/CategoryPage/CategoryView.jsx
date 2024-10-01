import {
  CloudArrowUpIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../../services/axiosConfig";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";

const features = [
  {
    name: "Find Your Perfect Meal",
    description:
      "Dive into a world of flavors with easy browsing across various cuisines. Personalize every dish to match your exact taste and dietary preferences.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Track Every Bite",
    description:
      "Follow your order’s journey in real-time, from preparation to delivery. Enjoy timely updates that keep you informed until your food arrives.",
    icon: TruckIcon,
  },
  {
    name: "Nourish Smartly",
    description:
      "Make informed food choices with detailed nutritional breakdowns for each dish. Tailor your meals to align perfectly with your health and dietary goals.",
    icon: InformationCircleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

export default function CategoryView() {
  const { id: categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [reciepes, setReciepes] = useState([]);
  const [isShowMore, setIsShowMore] = useState(false);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      let tempCategories = await getRequest("categories.php");

      let tempCategory = tempCategories.data.categories.filter((category) => {
        if (category.strCategory == categoryName) {
          return category;
        }
      });
      setCategory(tempCategory[0]);
      fetchReciepes();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchReciepes() {
    let tempReciepes = await getRequest(`filter.php?c=${categoryName}`);
    setReciepes(tempReciepes.data.meals);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <Link to={-1}>
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  <span aria-hidden="true">&larr;</span> Previous Page
                </h2>
              </Link>
              {isLoading ? (
                <>
                  <Skeleton width={150} height={50} />
                  <Skeleton width={400} />
                  <Skeleton width={400} />
                  <Skeleton width={400} />
                  <Skeleton width={400} />
                  <Skeleton width={400} />

                  <Skeleton width={400} height={100} />
                  <Skeleton width={400} height={100} />
                  <Skeleton width={400} height={100} />
                </>
              ) : (
                <>
                  <h1 className="mt-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {category.strCategory}
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    {isShowMore
                      ? category.strCategoryDescription
                      : category.strCategoryDescription.substring(0, 300)}
                    <button
                      onClick={() => {
                        setIsShowMore(!isShowMore);
                      }}
                      className="font-bold text-sm py-3"
                    >
                      {isShowMore ? "  Show less" : "... Show more"}
                    </button>
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon
                            aria-hidden="true"
                            className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                          />
                          {feature.name}
                        </dt>{" "}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </div>
          </div>
          {isLoading ? (
            <>
              <Skeleton width={800} height={500} />
            </>
          ) : (
            <>
              <img
                alt="Product screenshot"
                src={category.strCategoryThumb}
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl  sm:w-[57rem] md:-ml-4 lg:-ml-0"
              />
            </>
          )}
        </div>

        {/* Reciepes List */}
        {isLoading ? (
          <>isLoading....</>
        ) : (
          <>
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Here are some popular {categoryName} dishes
              </h2>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {reciepes.map((reciepe) => (
                  <a key={reciepe.idMeal} href="#" className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        alt={reciepe.strMeal}
                        src={reciepe.strMealThumb}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {reciepe.strMeal}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      $200
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
