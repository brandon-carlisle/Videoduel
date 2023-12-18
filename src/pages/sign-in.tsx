import { type GetServerSideProps } from "next";
import { signIn } from "next-auth/react";

import Header from "@/components/features/header/header";

import { getServerAuthSession } from "../server/auth";

export default function SignInPage() {
  return (
    <>
      <Header
        title="Sign in"
        description="You only need to sign in if you want to create a bracket."
      />

      <div className="flex flex-col gap-3 md:flex-row">
        <button
          className="flex w-[191px] items-center rounded-sm bg-[#4285F4] pr-2 shadow-md active:scale-[.99]"
          onClick={() => void signIn("google")}
        >
          <div className="mr-2">
            <GoogleIcon />
          </div>
          <div className="text-sm text-white">Sign in with Google</div>
        </button>

        <button
          className="flex w-[191px] items-center rounded-sm bg-[#7289DA] pr-2 shadow-md active:scale-[.99]"
          onClick={() => void signIn("discord")}
        >
          <DiscordIcon />

          <div className="text-sm text-white">Sign in with Discord</div>
        </button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

function GoogleIcon() {
  return (
    <svg
      width="46px"
      height="46px"
      viewBox="0 0 46 46"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          id="filter-1"
        >
          <feOffset
            dx="0"
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="0.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0"
            in="shadowBlurOuter1"
            type="matrix"
            result="shadowMatrixOuter1"
          ></feColorMatrix>
          <feOffset
            dx="0"
            dy="0"
            in="SourceAlpha"
            result="shadowOffsetOuter2"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="0.5"
            in="shadowOffsetOuter2"
            result="shadowBlurOuter2"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0"
            in="shadowBlurOuter2"
            type="matrix"
            result="shadowMatrixOuter2"
          ></feColorMatrix>
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <rect id="path-2" x="0" y="0" width="40" height="40" rx="2"></rect>
        <rect id="path-3" x="5" y="5" width="38" height="38" rx="1"></rect>
      </defs>
      <g
        id="Google-Button"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="9-PATCH" transform="translate(-608.000000, -219.000000)"></g>
        <g
          id="btn_google_dark_normal"
          transform="translate(-1.000000, -1.000000)"
        >
          <g
            id="button"
            transform="translate(4.000000, 4.000000)"
            filter="url(#filter-1)"
          >
            <g id="button-bg">
              <use fill="#4285F4" fillRule="evenodd" xlinkHref="#path-2"></use>
              <use fill="none" xlinkHref="#path-2"></use>
              <use fill="none" xlinkHref="#path-2"></use>
              <use fill="none" xlinkHref="#path-2"></use>
            </g>
          </g>
          <g id="button-bg-copy">
            <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-3"></use>
            <use fill="none" xlinkHref="#path-3"></use>
            <use fill="none" xlinkHref="#path-3"></use>
            <use fill="none" xlinkHref="#path-3"></use>
          </g>
          <g id="logo_googleg_48dp" transform="translate(15.000000, 15.000000)">
            <path
              d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
              id="Shape"
              fill="#4285F4"
            ></path>
            <path
              d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
              id="Shape"
              fill="#34A853"
            ></path>
            <path
              d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
              id="Shape"
              fill="#FBBC05"
            ></path>
            <path
              d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
              id="Shape"
              fill="#EA4335"
            ></path>
            <path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <div className="flex h-[46px] w-[46px] items-center justify-center">
      <div className="flex h-[40px] w-[40px] items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 127.14 96.36"
          width="23"
          height="23"
        >
          <path
            fill="#fff"
            d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
          />
        </svg>
      </div>
    </div>
  );
}
