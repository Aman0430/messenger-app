import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-slate-500 
        px-4 
        py-2 
        text-slate-300 
        shadow-sm 
        hover:bg-slate-600 
        focus:outline-offset-0
      "
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
