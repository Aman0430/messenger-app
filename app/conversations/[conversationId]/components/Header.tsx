"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="bg-slate-900 w-full flex sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-lg border-b-[1px] border-slate-900">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-700 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={35} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col text-slate-200">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-slate-500">{statusText}</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-700 transition"
      />
    </div>
  );
};

export default Header;
