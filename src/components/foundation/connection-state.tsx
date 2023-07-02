import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { HiBolt } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import { socket } from "../../socket";

const ConnectionState = () => {
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("error", handleTracError);
    socket.on("response", handleTracResponse);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("error", handleTracError);
      socket.off("response", handleTracResponse);
    };
  }, []);

  const handleConnect = React.useCallback(() => {
    console.log("socket has connected");
    setIsConnected(true);
  }, []);

  const handleDisconnect = React.useCallback(() => {
    console.log("socket has disconnected");
    setIsConnected(false);
  }, []);

  const handleTracError = React.useCallback((error: string) => {
    console.log("error", error);
  }, []);

  const handleTracResponse = React.useCallback((response: unknown) => {
    console.log("response", response);
  }, []);

  const handleConnectClicked = () => {
    socket.connect();
  };

  const handleDisconnectClicked = () => {
    socket.disconnect();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center ml-4 transition-colors border rounded-full border-secondary-300 hover:border-secondary-200 w-7 h-7 dark:border-secondary-700 text-secondary-900 dark:text-secondary-100 hover:dark:border-secondary-800">
          <HiBolt className="w-4 h-4 " />
          <div
            className={twMerge(
              "absolute top-0 right-0 rounded-full w-2 h-2",
              isConnected && "bg-green-500",
              !isConnected && "bg-red-500"
            )}
          />
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
        <Menu.Items className="absolute right-0 w-24 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg divide-secondary-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button
                className={twMerge(
                  "flex items-center w-full px-2 py-2 text-sm rounded-md hover:bg-secondary-100 disabled:opacity-50 disabled:pointer-events-none"
                )}
                disabled={isConnected}
                onClick={handleConnectClicked}
              >
                Connect
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                className={twMerge(
                  "flex items-center w-full px-2 py-2 text-sm rounded-md hover:bg-secondary-100 disabled:opacity-50 disabled:pointer-events-none"
                )}
                disabled={!isConnected}
                onClick={handleDisconnectClicked}
              >
                Disconnect
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ConnectionState;
