import { io } from "socket.io-client";

const socket = io("https://ordgames.trac.network", {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 500,
  randomizationFactor: 0,
});

export interface EmitPromiseProps {
  func: string;
  args: string[];
  call_id: string;
}

export interface EmitResponse {
  args: string[];
  call_id: string;
  error: string;
  func: string;
  result: unknown;
}

const emitPromise = ({
  func,
  args,
  call_id,
}: EmitPromiseProps): Promise<EmitResponse> => {
  return new Promise((resolve, reject) => {
    const handleTracResponse = (response: EmitResponse) => {
      if (response.error === "") {
        resolve(response);
      } else {
        reject(response.error);
      }
      socket.off("response", handleTracResponse);
    };

    socket.on("response", handleTracResponse);

    socket.emit("get", {
      func,
      args,
      call_id,
    });
  });
};

export { emitPromise, socket };
