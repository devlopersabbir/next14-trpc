import Todos from "@/components/todos";
import { serverClient } from "@/tRPC/serverClient";

export default async function Home() {
  console.log(await serverClient.store("Sabbir"));
  return (
    <>
      <h1>hello world</h1>
      <Todos />
    </>
  );
}
