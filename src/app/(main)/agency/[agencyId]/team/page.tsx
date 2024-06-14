import { db } from "@/lib/db";
import React from "react";
import DataTable from "./_components/data-table";
import { getAuthUserDetails } from "@/lib/queries";
import { Plus } from 'lucide-react';
import { columns } from './_components/columns';
import SendInvitation from '@/components/forms/send-invitation';

type Props = {
  params: { agencyId: string };
};

const TeamPage = async ({ params }: Props) => {
  const authUser = await getAuthUserDetails();

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return;

  return <DataTable
      actionButtonText = {
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren = {
        <>
          <br />
          <SendInvitation agencyId={agencyDetails.id} />
        </>
      }
      columns={columns}
      data={teamMembers}
      filterValue={"name"}
    >

    </DataTable>;
};

export default TeamPage;
