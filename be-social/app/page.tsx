import Feed from "@/components/Feed";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className={`mx-auto max-w-[90vw] container`}>
        <Header/>
      <main className="flex gap-4">
        <Navbar/>
        <Feed/>
      </main>
    </div>
         
  );
}
