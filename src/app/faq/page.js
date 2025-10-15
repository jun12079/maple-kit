import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "MapleKit 是什麼？",
    answer: "MapleKit 是一個給新楓之谷玩家使用的工具網站，提供遊戲相關的計算工具，讓玩家能輕鬆掌握角色的遊戲進度。"
  },
  {
    id: "item-2",
    question: "為什麼會做 MapleKit?",
    answer: "興趣使然。"
  },
  {
    id: "item-3",
    question: "為什麼只有命運武器進度工具？",
    answer: "最初是為了給台版即將開放的命運武器而製作的，之後有想到什麼功能會再陸續加入。"
  },
  {
    id: "item-4",
    question: "如何回報網站問題或建議？",
    answer: (
      <span>
        如果發現網站有任何問題，歡迎透過{' '}
        <a
          href="https://forms.gle/TfA1kbPJmsorU9wv6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white font-semibold underline hover:no-underline"
        >
          回報表單
        </a>{' '}
        提供建議。
      </span>
    )
  }
];

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {/* FAQ 標題 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">常見問題</h1>
          </div>

          <Accordion type="multiple" collapsible="true" className="w-full">
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="mb-4 border-b-0">
                <AccordionTrigger className="text-left font-semibold hover:no-underline px-6 py-4 bg-white dark:bg-gray-800 rounded-t-xl border border-gray-200 dark:border-gray-700 [&[data-state=open]]:rounded-b-none">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-x border-b border-gray-200 dark:border-gray-700 rounded-b-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}