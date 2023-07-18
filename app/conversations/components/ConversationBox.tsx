"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const session = useSession();
  const router = useRouter();
  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
                w-full relative flex items-center space-x-3 hover:bg-slate-700 rounded-lg transition cursor-pointer mb-1 p-2 text-white
            `,
        selected ? "bg-slate-700" : "bg-slate-900"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-slate-200">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-slate-500 font-mono">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncated text-sm`,
              hasSeen ? "text-slate-600" : "text-slate-400 font-sans"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
