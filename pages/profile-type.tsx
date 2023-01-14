import Head from "components/Head"
import UserContext from "context/user"
import { useWindowSize } from "hooks/useWindowSize"
import Link from "next/link"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import Confetti from "react-confetti"
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
  const [profileScore, setProfileScore] = useState<ProfileScore>({
    mastery: 1,
    risk: 1,
    duration: 1,
    purpose: 1,
    status: 1,
  })

  const [profileType, setProfileType] = useState<UserProfileType>()

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (profileType) {
      setShowResult(true)
      setUserProfile(profileType)
    }
  }

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
      <div className="mt-auto">
        <button className="bg-black/10 text-black cursor-pointer font-semibold py-[10px] w-full h-[51px] rounded-full transition hover:bg-black/20">
          Generate Profile
        </button>
      </div>
    </form>
  )
}

const ProfileTypePage = () => {
  const { setUserProfile, userProfile } = useContext(UserContext)
  const { width, height } = useWindowSize()
  const [showResult, setShowResult] = useState<boolean>(false)
  return (
    <>
      <Head title="Create profile | Upvest" />
      <div className="px-[36px] pb-[36px] pt-[54px] flex flex-col h-full justify-between">
        <h1 className="text-black text-[36px] font-medium pb-[48px]">
          Let's get to know more about you
        </h1>
        {showResult && userProfile ? (
          <div className="text-black flex text-center flex-col gap-[16px] bg-black/[0.03] p-[24px] rounded-[20px] h-fit mb-auto">
            <Confetti width={width} height={height} />
            <p className="opacity-50 font-medium">Your investment profile is</p>
            <p className="text-[32px] font-semibold">{userProfile}</p>
            <p className="opacity-50">
              Start your first investment with our stock recommendations based
              on your profile!
            </p>
            <Link href="/stock">
              <button className="bg-black/10 text-black mt-[60px] cursor-pointer font-semibold py-[10px] w-full h-[51px] rounded-full transition hover:bg-black/20">
                See My Recommendation
              </button>
            </Link>
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
