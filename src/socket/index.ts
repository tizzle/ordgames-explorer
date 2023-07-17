import { io } from "socket.io-client";
import { EmitPromiseProps, EmitProps, EmitResponse } from "../types/socket";

const connectOrdGamesSocket = () => {
  return io("https://ordgames.trac.network", {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 500,
    randomizationFactor: 0,
  });
};

const connectTracSocket = () => {
  return io("https://api.trac.network", {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 500,
    randomizationFactor: 0,
  });
};

const emitPromise = ({
  socket,
  func,
  args,
  call_id,
}: EmitPromiseProps): Promise<EmitResponse> => {
  return new Promise((resolve, reject) => {
    const handleTracResponse = (response: EmitResponse) => {
      console.log("handling trac response", response);
      if (response.error === "") {
        resolve(response);
      } else {
        reject(response.error);
      }
      socket.off("response", handleTracResponse);
    };

    console.log("emit trac promise", func, args, call_id);

    socket.on("response", handleTracResponse);

    socket.emit("get", {
      func,
      args,
      call_id,
    });
  });
};

const emit = ({ socket, func, args, call_id }: EmitProps) => {
  socket.emit("get", {
    func,
    args,
    call_id,
  });
};

export { connectOrdGamesSocket, connectTracSocket, emit, emitPromise };
