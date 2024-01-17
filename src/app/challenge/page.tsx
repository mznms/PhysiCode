import { Link } from "@nextui-org/link";

export default function ChallengeQuestionPage() {
  return (
    <main className="flex flex-col gap-2 max-w-screen-md mx-auto p-4">
      <Link href="/challenge/1" size="lg">
        チャレンジ 1
      </Link>
      <Link href="/challenge/2" size="lg">
        チャレンジ 2
      </Link>
      <Link href="/challenge/3" size="lg">
        チャレンジ 3
      </Link>
    </main>
  );
}
