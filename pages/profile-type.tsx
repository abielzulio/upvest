import Head from "components/Head"
import UserContext from "context/user"
import { useWindowSize } from "hooks/useWindowSize"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import Confetti from "react-confetti"
import { toast } from "react-hot-toast"
import { DispatchSetState, UserProfileType } from "type"

const PROFILE_OPTIONS = {
  mastery: [
    {
      value: 1,
      label: "Have no knowledge at all",
    },
    {
      value: 2,
      label: "Have basic knowledge",
    },
    {
      value: 3,
      label: "Have advanced knowledge",
    },
  ],
  risk: [
    {
      value: 1,
      label: "Can't risk to lose",
    },
    {
      value: 2,
      label: "Can risk to lose some",
    },
    {
      value: 3,
      label: "Can risk to lose many",
    },
  ],
  duration: [
    {
      value: 1,
      label: "Long term",
    },
    {
      value: 2,
      label: "Medium term",
    },
    {
      value: 3,
      label: "Short term",
    },
  ],
  purpose: [
    {
      value: 1,
      label: "Retirement, education, etc",
    },
    {
      value: 2,
      label: "Property & working capital",
    },
    {
      value: 3,
      label: "Consumptive use",
    },
  ],
  status: [
    {
      value: 1,
      label: "Married and having kids",
    },
    {
      value: 2,
      label: "Married and having no kids",
    },
    {
      value: 3,
      label: "Single",
    },
  ],
}

interface ProfileScore {
  mastery: number
  risk: number
  duration: number
  purpose: number
  status: number
}

const ProfileTypeQuiz = ({
  setUserProfile,
  setShowResult,
}: {
  setUserProfile: DispatchSetState<UserProfileType>
  setShowResult: DispatchSetState<boolean>
}) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [profileScore, setProfileScore] = useState<ProfileScore>({
    mastery: 1,
    risk: 1,
    duration: 1,
    purpose: 1,
    status: 1,
  })

  const [profileType, setProfileType] = useState<UserProfileType>()

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    if (profileType) {
      setUserProfile(profileType)
    }
  }

  useEffect(() => {
    if (isLoading) {
      const toastLoad = toast.loading("Generating profile...")
      setTimeout(() => {
        toast.dismiss(toastLoad)
        toast.success("Profile is generated!")
        setLoading(false)
        setShowResult(true)
      }, 5000)
    }
  }, [isLoading])

  useEffect(() => {
    const totalProfileScore = parseFloat(
      (
        profileScore.mastery * 0.2 +
        profileScore.risk * 0.3 +
        profileScore.duration * 0.2 +
        profileScore.purpose * 0.15 +
        profileScore.status * 0.15
      ).toString()
    )

    if (totalProfileScore < 2.0) {
      setProfileType("Conservative")
    }

    if (totalProfileScore >= 2.0 && totalProfileScore < 3.0) {
      setProfileType("Moderate")
    }

    if (totalProfileScore >= 3.0) {
      setProfileType("Aggresive")
    }
  }, [profileScore])

  return (
    <form
      className="flex flex-col gap-[16px] bg-black/[0.03] text-black p-[24px] rounded-[20px] h-full"
      onSubmit={(e) => onSubmitForm(e)}
    >
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="mastery" className="text-sm opacity-50 font-semibold">
          How is your level of understanding and mastery on investing?
        </label>
        <select
          id="mastery"
          defaultValue={profileScore.mastery}
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 text-[14px]"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setProfileScore({
              ...profileScore,
              mastery: Number(e.target.value),
            })
          }
        >
          {PROFILE_OPTIONS.mastery.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="risk" className="text-sm opacity-50 font-semibold">
          How is your risk view on your money that you invest?
        </label>
        <select
          id="risk"
          defaultValue={profileScore.risk}
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 text-[14px]"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setProfileScore({
              ...profileScore,
              risk: Number(e.target.value),
            })
          }
        >
          {PROFILE_OPTIONS.risk.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="duration" className="text-sm opacity-50 font-semibold">
          How long do you intend to invest?
        </label>
        <select
          id="duration"
          defaultValue={profileScore.duration}
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 text-[14px]"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setProfileScore({
              ...profileScore,
              duration: Number(e.target.value),
            })
          }
        >
          {PROFILE_OPTIONS.duration.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="purpose" className="text-sm opacity-50 font-semibold">
          What is the purpose of your investment?
        </label>
        <select
          id="purpose"
          defaultValue={profileScore.purpose}
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 text-[14px]"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setProfileScore({
              ...profileScore,
              purpose: Number(e.target.value),
            })
          }
        >
          {PROFILE_OPTIONS.purpose.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="status" className="text-sm opacity-50 font-semibold">
          What is your current status?
        </label>
        <select
          id="status"
          defaultValue={profileScore.status}
          className="border-[2px] border-black/10 h-[36px] pl-[12px] bg-transparent rounded-[6px] placeholder:text-black/30 text-[14px]"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setProfileScore({
              ...profileScore,
              status: Number(e.target.value),
            })
          }
        >
          {PROFILE_OPTIONS.status.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-auto relative">
        <button className="bg-black text-white text-[14px] cursor-pointer font-semibold py-[10px] w-full h-[51px] mt-[24px] border-[2px] border-transparent rounded-full transition hover:bg-transparent hover:border-black hover:text-black">
          {isLoading ? <p className="animate-spin">???</p> : `Generate Profile`}
        </button>
      </div>
    </form>
  )
}

const ProfileTypePage = () => {
  const { setUserProfile, userProfile } = useContext(UserContext)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { width, height } = useWindowSize()
  const router = useRouter()
  const QUERY_ITEM_DATA = router.query
  const [showResult, setShowResult] = useState<boolean>(false)

  const onSeeStockClick = (e: FormEvent<HTMLButtonElement>) => {
    setLoading(true)
    e.preventDefault()
  }

  useEffect(() => {
    if (isLoading) {
      const toastLoad = toast.loading("Preparing our best stocks...")
      setTimeout(() => {
        router.push({
          pathname: "/stock",
          query: { ...QUERY_ITEM_DATA, toastLoad },
        })
      }, 5000)
    }
  }, [isLoading])
  return (
    <>
      <Head title="Create profile | Upvest" />
      <div className="px-[36px] pb-[36px] py-[36px] flex flex-col h-screen-safe">
        <h1 className="text-black text-[36px] font-medium pb-[36px]">
          Let's get to know more about you
        </h1>
        {showResult && userProfile ? (
          <div className="text-black flex text-center flex-col gap-[16px] bg-black/[0.03] p-[24px] rounded-[20px] h-fit mb-auto">
            <Confetti width={width} height={height} />
            <p className="opacity-50 font-medium">Your investment profile is</p>
            <p className="text-[32px] font-semibold">
              {userProfile ?? "Conservative"}
            </p>
            <p className="opacity-50">
              Start your first investment with our stock recommendations based
              on your profile!
            </p>
            <div className="flex flex-col gap-[10px]">
              <Link href="/stock">
                <button
                  onClick={(e) => onSeeStockClick(e)}
                  className="bg-black text-white text-[14px] cursor-pointer font-semibold py-[10px] w-full h-[51px] mt-[24px] border-[2px] border-transparent rounded-full transition hover:bg-transparent hover:border-black hover:text-black"
                >
                  {isLoading ? (
                    <p className="animate-spin">???</p>
                  ) : (
                    `See My Recommendation`
                  )}
                </button>
              </Link>
              <button
                onClick={() => setShowResult(false)}
                className="text-black cursor-pointer text-[14px] opacity-50 hover:opacity-100 font-semibold py-[10px] w-full h-[51px] rounded-full transition underline"
              >
                Edit profile
              </button>
            </div>
          </div>
        ) : (
          <ProfileTypeQuiz
            setUserProfile={setUserProfile}
            setShowResult={setShowResult}
          />
        )}
      </div>
    </>
  )
}

export default ProfileTypePage
