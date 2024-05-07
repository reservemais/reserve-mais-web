"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars4Icon,
  XMarkIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { useAuth } from "@/hooks";

import { GetRoutes } from "./data";

const Navbar = () => {
  const { session, isAuthenticated, token } = useAuth();
  const router = usePathname();
  const routes = GetRoutes();

  if (token) {
    localStorage.setItem("reservas-token", token);
  }

  return (
    <Disclosure as="nav" className="bg-slate-800">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarDaysIcon className="block w-8 h-8 text-secondary" />
                </div>
                {routes.map((item) => (
                  <div className="hidden sm:block sm:ml-6" key={item.route}>
                    <div className="flex space-x-4">
                      <Link
                        href={item.route}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          router === item.route
                            ? "bg-slate-800 text-secondary"
                            : "text-gray-300 hover:bg-primary hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-secondary">
                        <span className="sr-only">Abrir menu</span>
                        {isAuthenticated ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
                            <span className="font-medium leading-none text-white">
                              {session?.user?.name &&
                                session.user.name
                                  .split(" ")
                                  .map((word) => word.charAt(0))
                                  .join("")}
                            </span>
                          </span>
                        ) : (
                          <UserIcon className="w-8 h-8 rounded-full text-secondary" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {isAuthenticated ? (
                        <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-secondary hover:text-white"
                              onClick={() => {
                                localStorage.removeItem("reservas-token");
                                signOut({
                                  redirect: true,
                                  callbackUrl: "/pages/SignIn",
                                });
                              }}
                            >
                              Sair
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <Link
                              href="/pages/SignIn"
                              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-secondary hover:text-white"
                            >
                              Fazer Login
                            </Link>
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars4Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {routes.map((item) => (
              <div className="px-2 pt-2 pb-2 space-y-1" key={item.route}>
                <Link
                  href={item.route}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    router === item.route
                      ? "bg-gray-900 text-secondary"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {isAuthenticated ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
                        <span className="font-medium leading-none text-white">
                          {session?.user?.name &&
                            session.user.name
                              .split(" ")
                              .map((word) => word.charAt(0))
                              .join("")}
                        </span>
                      </span>
                    ) : (
                      <UserIcon className="w-8 h-8 rounded-full text-secondary" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {session?.user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {session?.user?.email}
                    </div>
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700"
                    onClick={() => {
                      localStorage.removeItem("reservas-token");
                      signOut({
                        redirect: true,
                        callbackUrl: "/pages/SignIn",
                      });
                    }}
                  >
                    Sair
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="px-2 mt-3 space-y-1">
                  <Disclosure.Button
                    as={Link}
                    href="/pages/SignIn"
                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700"
                  >
                    Fazer Login
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
