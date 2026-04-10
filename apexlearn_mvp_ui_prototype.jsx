import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy, Flame, Clock3, BarChart3, AlertCircle, CheckCircle2, User, Users, Calculator, ChevronRight, FileText, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const subjects = [
  {
    id: "maths",
    name: "Mathematics",
    icon: Calculator,
    mastery: 62,
    weakTopics: ["Algebra", "Linear graphs"],
    topics: [
      { name: "Whole numbers", progress: 86 },
      { name: "Algebra", progress: 48 },
      { name: "Geometry", progress: 64 },
      { name: "Linear graphs", progress: 39 },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    mastery: 71,
    weakTopics: ["Comprehension", "Essay planning"],
    topics: [
      { name: "Grammar", progress: 73 },
      { name: "Comprehension", progress: 51 },
      { name: "Poetry", progress: 67 },
      { name: "Essay planning", progress: 54 },
    ],
  },
  {
    id: "science",
    name: "Physical Sciences",
    icon: Brain,
    mastery: 58,
    weakTopics: ["Newton's laws", "Chemical reactions"],
    topics: [
      { name: "Matter and materials", progress: 61 },
      { name: "Newton's laws", progress: 42 },
      { name: "Energy", progress: 64 },
      { name: "Chemical reactions", progress: 47 },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    icon: FileText,
    mastery: 66,
    weakTopics: ["Cash flow statement", "Debtors control"],
    topics: [
      { name: "General ledger", progress: 72 },
      { name: "Cash flow statement", progress: 53 },
      { name: "Inventory systems", progress: 74 },
      { name: "Debtors control", progress: 55 },
    ],
  },
];

const examCards = [
  { title: "Mathematics Algebra Sprint", duration: "20 min", questions: 12, level: "Moderate" },
  { title: "English Comprehension Drill", duration: "25 min", questions: 10, level: "Moderate" },
  { title: "Physical Sciences Mixed Test", duration: "35 min", questions: 18, level: "Hard" },
  { title: "Accounting Exam Booster", duration: "30 min", questions: 15, level: "Moderate" },
];

const alerts = [
  "Mathematics algebra performance dropped 8% this week.",
  "Physical Sciences study time is below target for the last 5 days.",
  "English comprehension improved after two practice sessions.",
];

function SectionHeading({ title, subtitle }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, hint }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-2">{hint}</p>
          </div>
          <div className="rounded-2xl border p-3">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SubjectCard({ subject, onOpen }) {
  const Icon = subject.icon;
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-2xl shadow-sm h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border p-3">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">{subject.name}</CardTitle>
                <CardDescription>{subject.weakTopics.join(" • ")}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">{subject.mastery}% mastery</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={subject.mastery} className="h-2" />
          <div className="space-y-3">
            {subject.topics.slice(0, 3).map((topic) => (
              <div key={topic.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{topic.name}</span>
                  <span className="text-muted-foreground">{topic.progress}%</span>
                </div>
                <Progress value={topic.progress} className="h-2" />
              </div>
            ))}
          </div>
          <Button className="w-full rounded-2xl" onClick={onOpen}>
            Open subject
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AIChatPanel() {
  const [question, setQuestion] = useState("Explain algebra like a teacher for Grade 8 and give me two examples.");
  const response = useMemo(
    () => `Algebra is a way of using letters and symbols to represent numbers we do not know yet.\n\nStep 1: Think of the letter like a placeholder. In x + 3 = 7, x is the missing number.\nStep 2: Remove 3 from both sides. x = 4.\n\nExample 1: y - 5 = 9, so y = 14.\nExample 2: 2a = 10, so a = 5.\n\nNow try this: x + 6 = 15`,
    []
  );

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Tutor
            </CardTitle>
            <CardDescription>CAPS-aligned help with structured teaching controls.</CardDescription>
          </div>
          <Badge>Grade 8 Maths</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Button variant="secondary" className="rounded-2xl">Explain step-by-step</Button>
          <Button variant="secondary" className="rounded-2xl">Explain simpler</Button>
          <Button variant="secondary" className="rounded-2xl">Give examples</Button>
          <Button variant="secondary" className="rounded-2xl">Test me</Button>
        </div>
        <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="min-h-28 rounded-2xl" />
        <Button className="rounded-2xl">Ask tutor</Button>
        <div className="rounded-2xl border bg-muted/30 p-4 whitespace-pre-line text-sm leading-6">
          {response}
        </div>
      </CardContent>
    </Card>
  );
}

function SubjectDetail({ subject }) {
  const Icon = subject.icon;
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border p-4">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">Focus area recommendations based on recent learner performance.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{subject.mastery}% mastery</Badge>
            <Badge variant="outline">2 weak topics</Badge>
            <Badge variant="outline">Exam mode ready</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {subject.topics.map((topic) => (
            <Card key={topic.name} className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-medium">{topic.name}</h4>
                    <p className="text-sm text-muted-foreground">Lesson • Practice • Quiz</p>
                  </div>
                  <Badge variant={topic.progress >= 65 ? "secondary" : "destructive"}>{topic.progress}%</Badge>
                </div>
                <Progress value={topic.progress} className="h-2 mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-2xl">Learn</Button>
                  <Button size="sm" variant="secondary" className="rounded-2xl">Practice</Button>
                  <Button size="sm" variant="outline" className="rounded-2xl">Quiz</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Recommended next action</CardTitle>
              <CardDescription>Use weak-topic targeting to improve marks faster.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border p-4">
                <p className="font-medium">Focus on {subject.weakTopics[0]}</p>
                <p className="text-sm text-muted-foreground mt-1">12 practice questions and 1 mini quiz available.</p>
              </div>
              <Button className="w-full rounded-2xl">Start recovery plan</Button>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Exam readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={subject.mastery + 8} className="h-2" />
                <p className="text-sm text-muted-foreground">Current estimate: {Math.min(subject.mastery + 8, 100)}%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ExamPrep() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {examCards.map((card) => (
        <Card key={card.title} className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">{card.title}</CardTitle>
            <CardDescription>{card.level} • {card.questions} questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              {card.duration}
            </div>
            <Button className="w-full rounded-2xl">Start test</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ParentDashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Parent overview</CardTitle>
            <CardDescription>Clear signals on progress, consistency, and weak subjects.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={Clock3} label="Study time" value="6.4 hrs" hint="This week" />
            <MetricCard icon={Trophy} label="Exam readiness" value="67%" hint="Across current subjects" />
            <MetricCard icon={Flame} label="Consistency" value="5 day streak" hint="Good momentum" />
            <MetricCard icon={BarChart3} label="Top subject" value="English" hint="71% mastery" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Subject breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((s) => (
              <div key={s.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{s.mastery}% mastery</span>
                </div>
                <Progress value={s.mastery} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Simple insights parents can act on fast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-2xl border p-3 text-sm flex gap-3">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{alert}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Recommended action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-muted/40 p-4 text-sm">
              Increase Maths practice to 15 minutes daily and complete one Physical Sciences mixed quiz this weekend.
            </div>
            <Button className="w-full rounded-2xl">Share weekly report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ApexLearnMVPPrototype() {
  const [selectedSubjectId, setSelectedSubjectId] = useState("maths");
  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <Card className="rounded-[28px] shadow-sm overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <Badge className="rounded-2xl mb-4">CAPS-aligned • Grades 8–12 • MVP prototype</Badge>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
                AI tutoring built for South African learners and the parents backing them.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl leading-7">
                Fast, exam-focused learning for Mathematics, English, Physical Sciences, and Accounting with diagnostics, structured explanations, practice, and parent visibility.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button className="rounded-2xl">Start free</Button>
                <Button variant="outline" className="rounded-2xl">View parent dashboard</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4">
                <MetricCard icon={Users} label="Target users" value="Parents + learners" hint="Web-first MVP" />
                <MetricCard icon={BookOpen} label="Launch subjects" value="4" hint="Maths, English, Science, Accounting" />
                <MetricCard icon={Trophy} label="Pricing target" value="R300–R500" hint="Monthly paid tier" />
                <MetricCard icon={CheckCircle2} label="Primary promise" value="Better marks" hint="Exam prep + AI tutoring" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="student" className="space-y-6">
          <TabsList className="grid w-full max-w-xl grid-cols-4 rounded-2xl">
            <TabsTrigger value="student" className="rounded-2xl">Student</TabsTrigger>
            <TabsTrigger value="subject" className="rounded-2xl">Subject</TabsTrigger>
            <TabsTrigger value="ai" className="rounded-2xl">AI Tutor</TabsTrigger>
            <TabsTrigger value="parent" className="rounded-2xl">Parent</TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="space-y-6">
            <SectionHeading title="Student dashboard" subtitle="Progress, weak topics, and next actions in one place." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard icon={User} label="Learner" value="Grade 8" hint="English-only MVP" />
              <MetricCard icon={Flame} label="Daily streak" value="5 days" hint="Keep momentum going" />
              <MetricCard icon={Clock3} label="Study time" value="94 min" hint="This week" />
              <MetricCard icon={Trophy} label="Overall mastery" value="64%" hint="Across selected subjects" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} onOpen={() => setSelectedSubjectId(subject.id)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subject" className="space-y-6">
            <SectionHeading title={`${selectedSubject.name} workspace`} subtitle="Topic-led learning, practice, and exam readiness." />
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubjectId === subject.id ? "default" : "outline"}
                  className="rounded-2xl"
                  onClick={() => setSelectedSubjectId(subject.id)}
                >
                  {subject.name}
                </Button>
              ))}
            </div>
            <SubjectDetail subject={selectedSubject} />
            <SectionHeading title="Exam prep" subtitle="Timed drills and mixed revision tests." />
            <ExamPrep />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <SectionHeading title="AI tutoring engine" subtitle="Constrained by grade, subject, and topic for better quality answers." />
            <AIChatPanel />
          </TabsContent>

          <TabsContent value="parent" className="space-y-6">
            <SectionHeading title="Parent dashboard" subtitle="Simple reporting that proves learning value and keeps retention high." />
            <ParentDashboard />
          </TabsContent>
        </Tabs>

        <Card className="rounded-[28px] shadow-sm">
          <CardHeader>
            <CardTitle>Developer notes for the real build</CardTitle>
            <CardDescription>Use this prototype as the visual reference for the MVP production app.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border p-4 text-sm">
              <p className="font-medium mb-2">Frontend</p>
              <p className="text-muted-foreground">Next.js + Tailwind + shadcn/ui. Responsive web-first experience.</p>
            </div>
            <div className="rounded-2xl border p-4 text-sm">
              <p className="font-medium mb-2">Backend</p>
              <p className="text-muted-foreground">Supabase auth, Postgres tables for users, topics, questions, attempts, mastery, and parent links.</p>
            </div>
            <div className="rounded-2xl border p-4 text-sm">
              <p className="font-medium mb-2">AI layer</p>
              <p className="text-muted-foreground">CAPS topic retrieval + strict tutor prompts + structured response sections.</p>
            </div>
            <div className="rounded-2xl border p-4 text-sm">
              <p className="font-medium mb-2">Monetization</p>
              <p className="text-muted-foreground">Free limited learner access, paid full AI tutor, exam mode, and parent reporting.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
