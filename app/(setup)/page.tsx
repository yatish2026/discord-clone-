import {db}from'@/lib/db';
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
const SetupPage=async()=>{
    const profile = await initialProfile();
    // Ensure profile is the expected object and not a React element
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: (profile as { id: string }).id
                }
            }
        }
    });
    if(server){
        return redirect(`/servers/${server.id}`);
    }

    return <div>Create a Server</div>;
}
export default SetupPage;
