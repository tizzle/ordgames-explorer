import { Socket } from "socket.io-client";
import { Ordinal } from "./ordinals";

export type EmitProps = {
  socket: Socket;
  func: string;
  args: string[];
  call_id: string;
};

export type EmitPromiseProps = {
  socket: Socket;
  func: string;
  args: string[];
  call_id: string;
};

export type EmitResponse = {
  args: string[];
  call_id: string;
  error: string;
  func: string;
  result: unknown;
};

export type EmitResponseOrdinal = EmitResponse & {
  result: Ordinal;
};
