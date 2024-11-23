import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import useCourseContent from "../hooks/useCourseContent";
const CourseContent = () => {
  const {id}=useParams()
  const [isLoading,courseContents,refetch]=useCourseContent(id)
  const [pdfLink,setPdfLink]=useState(null)
  const handleContentSelection=(fileLink)=>{
    setPdfLink(fileLink)
  }
  console.log(courseContents)
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="relative">
      <div className="flex min-h-[50vh] items-center justify-start z-10 absolute ">
        <button className="h-32 w-8 bg-slate-100" onClick={() => setIsOpen(true)}><IoMdArrowDropright className="text-3xl text-blue-700" /></button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Contents" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                {/* <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form> */}
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {
                      !isLoading? courseContents.lectures.map((lecture,idx)=><Sidebar.Item className="cursor-pointer" onClick={()=>handleContentSelection(lecture.fileUrl)} key={idx++}  icon={HiClipboard}>
                        {lecture?.lectureName}
                      </Sidebar.Item>):<Sidebar.Item  icon={HiClipboard}>
                      {'Loading...'}
                    </Sidebar.Item>
                    }
                    {/* <Sidebar.Item href="/" icon={HiChartPie}>
                      {courseContents.lectures[0].lectureName||'Dashboard'}
                    </Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                  <Drawer.Header title="Quiz" titleIcon={() => <></>} />
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      <div>
          {
            (!isLoading && !pdfLink)? <iframe
            src={
              courseContents.lectures[0].fileUrl.endsWith(".docx")
                ? `https://docs.google.com/gview?url=${courseContents.lectures[0].fileUrl}&embedded=true`
                : courseContents.lectures[0].fileUrl
            }
            width="100%"
            height="100%"
            className="border min-h-screen"
            allow="autoplay"
            title="Course Curriculum"
          ></iframe>:(!isLoading && pdfLink)? <iframe
          src={
            pdfLink.endsWith(".docx")
              ? `https://docs.google.com/gview?url=${pdfLink}&embedded=true`
              : pdfLink
          }
          width="100%"
            height="100%"
            className="border min-h-screen"
          allow="autoplay"
          title="Course Curriculum"
        ></iframe>:<div>
            <p>loading...</p>
          </div>
          }
      </div>
    </div>
  );
};

export default CourseContent;
