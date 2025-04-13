import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { Separator } from "~/components/ui/separator"
import { AppSidebar } from "~/components/app-sidebar"
import { Crop, Eye, Funnel, Pencil, Trash2, TriangleAlert, Workflow } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import DragDropComponent from "~/components/drag-and-drop-component"

const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 w-full transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between flex-wrap gap-4 w-full p-4 border-b-[1] pb-2.5">
            <div className="flex items-center justify-between gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Forms
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>New Form</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center justify-between gap-5"> 
                <div className="flex items-center gap-2.5">
                  <Crop className="text-shadow-blue-500" />
                  <h6 className="text-shadow-blue-500">Editer</h6>
                </div> 
                <div className="flex items-center gap-2.5 text-shadow-blue-500">
                  <Workflow />
                  <h6>Flow</h6>
                </div> 
            </div>
            <div className="flex items-center justify-between gap-2">
               <Button className="text-yellow-400" variant="secondary"><TriangleAlert /></Button>
               <Button variant="outline"><Funnel /></Button>
               <Button variant="outline">Share</Button>
               <Button variant="outline" className="text-blue-500"><Pencil /></Button>
               <Button variant="outline"><Eye /></Button>
               <Button variant="default" className="bg-blue-500">Save</Button>
            </div>
          </div>


        </header>
        <div className="lg:flex lg:flex-1 flex-col gap-4 px-4 pt-0">
          <div className="lg:flex auto-rows-min gap-4">
            <div className="aspect-video rounded-xl bg-muted/50 lg:w-[70%] sm:w-full w-full" />
            <div className="p-3 lg:w-[30%] sm:w-full w-full border-l-[1]" >
              <Tabs defaultValue="step" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="step">Step</TabsTrigger>
                  <TabsTrigger value="components">Components</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                </TabsList>
                <TabsContent value="step">
                  <div className="py-3">
                    <div className="flex items-center justify-between">
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                              Steps
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage>step8</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                      <div className="">
                        <Button variant="secondary" className="text-red-500">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    <div className="py-3">
                      <Tabs defaultValue="questions" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="questions">Questions</TabsTrigger>
                          <TabsTrigger value="marketing">Marketing</TabsTrigger> 
                        </TabsList>
                        <TabsContent value="questions">
                           <div className="py-3">
                              <div className="mb-4">
                                <h5 className="text-gray-800 font-medium">Components</h5>
                              </div>
                              <DragDropComponent/>
                           </div>
                        </TabsContent>
                        <TabsContent value="marketing">fgfd</TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="components">Change your password here.</TabsContent>
                <TabsContent value="design">design your password here.</TabsContent>
              </Tabs>

            </div>
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default page
