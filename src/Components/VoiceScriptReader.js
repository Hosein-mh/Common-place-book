import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Volume2,
  Upload,
  Download,
  ChevronLeft,
} from "lucide-react";

const VoiceScriptReader = () => {
  // Complete script data - imported from JSON
  const defaultScriptData = {
    scriptInfo: {
      title: "راز عمیق خودفریبی: چرا ذهن شما دشمن واقعیت است؟",
      author: "علی",
      duration: "5-6 دقیقه",
      language: "fa-IR",
      topic: "خودفریبی و آگاهی",
      description:
        "اسکریپت کامل ویدیوی آموزشی درباره خودفریبی بر اساس تعالیم لیو گورا",
    },
    sections: [
      {
        id: 1,
        section: "Hook & Opening",
        timeRange: "0:00-0:30",
        duration: 30,
        topic: "آغاز قدرتمند و جذب مخاطب",
        text: "درود دوستان امروز می‌خوام حقیقتی رو باهاتون در میان بذارم که احتمالاً تمام زندگیتون رو زیر سؤال می‌بره آماده‌اید",
        notes:
          "نگاه عمیق به دوربین، جدی و راز‌آلود، سکوت 3 ثانیه، آینه رو بالا بگیر",
        keyWords: ["درود", "دوستان", "حقیقت", "زندگی", "سؤال", "آماده"],
        emotion: "mysterious",
        energy: "medium",
      },
      {
        id: 2,
        section: "Mirror Question",
        timeRange: "0:30-1:00",
        duration: 30,
        topic: "سؤال آینه و معرفی مفهوم",
        text: "فکر می‌کنین این آینه منعکس‌کننده واقعیته حالا اگه بهتون بگم که شما هیچ وقت واقعیت رو ندیدین اگه بهتون بگم هر چیزی که تا الان فکر می‌کردین راسته دروغه",
        notes: "آینه رو نشان بده، حالت جدی، تعلیق ایجاد کن",
        keyWords: ["آینه", "منعکس", "واقعیت", "هیچوقت", "دروغ"],
        emotion: "suspenseful",
        energy: "medium-high",
      },
      {
        id: 3,
        section: "Main Premise",
        timeRange: "1:00-1:15",
        duration: 15,
        topic: "معرفی موضوع اصلی",
        text: "امروز قراره نشونتون بدم چطور ذهنتون بیست و چهار ساعت شبانه روز داره بهتون دروغ می‌گه و بدترین قسمتش اینه که شما عاشق این دروغاید",
        notes: "آینه رو کنار بذار، حالت جدی، تاکید روی کلمات کلیدی",
        keyWords: ["ذهن", "بیست", "چهار", "ساعت", "دروغ", "عاشق"],
        emotion: "serious",
        energy: "high",
      },
      {
        id: 4,
        section: "Core Question",
        timeRange: "1:15-1:45",
        duration: 30,
        topic: "سؤال اساسی درباره ذهن",
        text: "بذارین با یه سؤال ساده شروع کنم چرا ذهن شما وجود داره جواب علمی برای بقا برای زنده موندن ذهن شما یه دستگاه بقاست که طی میلیون‌ها سال دگرگونی یه کار رو یاد گرفته",
        notes: "کمی آرام‌تر، دست‌ها برای توضیح، تون آموزشی",
        keyWords: [
          "سؤال",
          "ذهن",
          "وجود",
          "علمی",
          "بقا",
          "زنده",
          "دستگاه",
          "میلیون",
          "دگرگونی",
        ],
        emotion: "explanatory",
        energy: "medium",
      },
      {
        id: 5,
        section: "Mind Function",
        timeRange: "1:45-2:15",
        duration: 30,
        topic: "عملکرد ذهن به عنوان دستگاه بقا",
        text: "حفظ هویت شما ولی مشکل اینجاست واقعیت اغلب اوقات تهدیدکننده هویت شماست پس ذهنتون چیکار می‌کنه واقعیت رو تغییر میده نه تو دنیای بیرون بلکه تو درک شما",
        notes: "دست روی سینه، تاکید روی مشکل، توضیح فرآیند",
        keyWords: ["حفظ", "هویت", "مشکل", "واقعیت", "تهدید", "تغییر", "درک"],
        emotion: "problem-revealing",
        energy: "medium",
      },
      {
        id: 6,
        section: "Example",
        timeRange: "2:15-2:45",
        duration: 30,
        topic: "مثال عملی از خودفریبی",
        text: "مثلاً وقتی شکست می‌خورین واقعیت می‌گه تو شکست خوردی ولی ذهنتون می‌گه نه شرایط ناعادلانه بود این فقط یه مثال سادست ولی عمق این موضوع خیلی بیشتره",
        notes: "مثال کاربردی، تغییر لحن برای شبیه‌سازی صداها",
        keyWords: [
          "مثلاً",
          "شکست",
          "واقعیت",
          "شرایط",
          "ناعادلانه",
          "ساده",
          "عمق",
        ],
        emotion: "example-giving",
        energy: "medium",
      },
      {
        id: 7,
        section: "Deeper Layer Intro",
        timeRange: "2:45-3:15",
        duration: 30,
        topic: "ورود به لایه عمیق‌تر",
        text: "حالا می‌خوام عمیق‌تر برم فکر می‌کنین دارین واقعیت رو می‌بینین اشتباه می‌کنین شما فقط یه تفسیر از واقعیت می‌بینین یه داستانی که ذهنتون ساخته",
        notes: "انرژی بالاتر، کمی به دوربین نزدیک شو، چالش‌برانگیز",
        keyWords: ["عمیق", "واقعیت", "اشتباه", "تفسیر", "داستان", "ساخته"],
        emotion: "challenging",
        energy: "high",
      },
      {
        id: 8,
        section: "Leo Gura Reference",
        timeRange: "3:15-3:45",
        duration: 30,
        topic: "استناد به لیو گورا",
        text: "لیو گورا یکی از عمیق‌ترین اندیشمندان امروزی نکته‌ای شگفت‌انگیز می‌گه تفاوتی بین واقعیت و تخیل وجود نداره اولش فکر می‌کنین این حرف مزخرفه ولی فکر کنین",
        notes: "انگشت اشاره به دوربین، معرفی منبع معتبر",
        keyWords: [
          "لیو",
          "گورا",
          "عمیق",
          "اندیشمند",
          "شگفت",
          "تفاوت",
          "تخیل",
          "مزخرف",
        ],
        emotion: "authoritative",
        energy: "medium-high",
      },
      {
        id: 9,
        section: "Reality Filters",
        timeRange: "3:45-4:30",
        duration: 45,
        topic: "فیلترهای درک واقعیت",
        text: "شما هیچ وقت واقعیت رو خام ندیدین همیشه از طریق صافی‌های ذهنتون تجربه‌های گذشته ترس‌ها آرزوها باورها فرهنگ زبان شما همیشه از پشت این عینک‌ها نگاه می‌کنین هیچ وقت عینک رو برنداشتین",
        notes: "دست‌ها رو مثل عینک جلوی چشم بگیر، لیست کردن فیلترها",
        keyWords: [
          "خام",
          "صافی",
          "تجربه",
          "گذشته",
          "ترس",
          "آرزو",
          "باور",
          "فرهنگ",
          "زبان",
          "عینک",
        ],
        emotion: "explanatory",
        energy: "medium",
      },
      {
        id: 10,
        section: "Certainty Challenge",
        timeRange: "4:30-5:00",
        duration: 30,
        topic: "به چالش کشیدن قطعیت",
        text: "پس چطور مطمئنین اون چیزی که می‌بینین واقعیته نمی‌تونین مطمئن باشین چون شما فقط تفسیرتون رو دیدین نه خود واقعیت رو",
        notes: "سکوت 2 ثانیه، تاکید روی عدم قطعیت",
        keyWords: ["مطمئن", "واقعیت", "تفسیر", "خود"],
        emotion: "thought-provoking",
        energy: "medium",
      },
      {
        id: 11,
        section: "Three Levels Intro",
        timeRange: "5:00-5:15",
        duration: 15,
        topic: "معرفی سه سطح خودفریبی",
        text: "حالا می‌خوام سه سطح خودفریبی رو برنامه بدم",
        notes: "آرام‌تر شو، دست‌ها برای شمردن، آماده‌سازی برای توضیح ساختاری",
        keyWords: ["سه", "سطح", "خودفریبی", "برنامه"],
        emotion: "structured",
        energy: "medium",
      },
      {
        id: 12,
        section: "Level One",
        timeRange: "5:15-5:45",
        duration: 30,
        topic: "سطح یک: تعصبات ذهنی",
        text: "سطح یک تعصبات ذهنی این همونیه که روان‌شناسی درموردش حرف می‌زنه مثل تعصب تأیید شما فقط اطلاعاتی رو می‌بینین که با عقایدتون هم‌راهه",
        notes: "انگشت اول بالا، توضیح مفهوم confirmation bias",
        keyWords: [
          "سطح",
          "یک",
          "تعصبات",
          "ذهنی",
          "روان‌شناسی",
          "تأیید",
          "اطلاعات",
          "عقاید",
        ],
        emotion: "educational",
        energy: "medium",
      },
      {
        id: 13,
        section: "Level One Example",
        timeRange: "5:45-6:00",
        duration: 15,
        topic: "مثال سطح یک",
        text: "مثلاً اگه فکر می‌کنین همه سیاستمدارا فاسدن فقط اخبار فساد رو توجه می‌کنین اخبار مثبت رو نادیده می‌گیرین",
        notes: "مثال کاربردی و قابل فهم",
        keyWords: ["سیاستمدار", "فاسد", "اخبار", "فساد", "مثبت", "نادیده"],
        emotion: "example-giving",
        energy: "medium",
      },
      {
        id: 14,
        section: "Level Two",
        timeRange: "6:00-6:30",
        duration: 30,
        topic: "سطح دو: محافظت از هویت",
        text: "سطح دو محافظت از هویت این عمیق‌تره نه تنها اطلاعات رو غربال می‌کنین بلکه کل روایت رو عوض می‌کنین تا هویتتون سالم بمونه",
        notes: "انگشت دوم، تاکید روی عمق بیشتر",
        keyWords: [
          "سطح",
          "دو",
          "محافظت",
          "هویت",
          "عمیق",
          "غربال",
          "روایت",
          "سالم",
        ],
        emotion: "deeper-explanation",
        energy: "medium",
      },
      {
        id: 15,
        section: "Level Two Example",
        timeRange: "6:30-7:00",
        duration: 30,
        topic: "مثال سطح دو",
        text: "مثلاً من آدم خوبی هستم این هویته امروز با کسی بد رفتار کردم این خطره راه‌حل ذهن اون آدم مستحقش بود",
        notes: "مثال شخصی‌سازی شده، نشان دادن فرآیند ذهنی",
        keyWords: [
          "آدم",
          "خوب",
          "هویت",
          "امروز",
          "بد",
          "رفتار",
          "خطر",
          "راه‌حل",
          "مستحق",
        ],
        emotion: "personal-example",
        energy: "medium",
      },
      {
        id: 16,
        section: "Level Three",
        timeRange: "7:00-7:45",
        duration: 45,
        topic: "سطح سه: خودفریبی وجودی",
        text: "سطح سه خودفریبی وجودی این عمیق‌ترین سطحه شما خود وجودتون رو یه داستان می‌دونین این من که فکر می‌کنین هستین یه ساخته ذهنیه یه مجموعه از خاطرات باورها و الگوهای فکری",
        notes: "انگشت سوم، صدا جدی‌تر، ورود به عمیق‌ترین بحث",
        keyWords: [
          "سطح",
          "سه",
          "وجودی",
          "عمیق",
          "وجود",
          "داستان",
          "من",
          "ساخته",
          "مجموعه",
          "خاطرات",
          "الگو",
        ],
        emotion: "philosophical",
        energy: "medium-low",
      },
      {
        id: 17,
        section: "Ego Resistance",
        timeRange: "7:45-8:15",
        duration: 30,
        topic: "مقاومت ایگو",
        text: "ولی ذهنتون این رو قبول نداره چون اگه بپذیره خودتون از بین میره پس یه توهم قدرتمند می‌سازه توهم یه خود پایدار و واقعی",
        notes: "توضیح مقاومت طبیعی ذهن",
        keyWords: [
          "ذهن",
          "قبول",
          "نداره",
          "بپذیره",
          "خود",
          "بین",
          "میره",
          "توهم",
          "قدرتمند",
          "پایدار",
        ],
        emotion: "resistance-explaining",
        energy: "medium",
      },
      {
        id: 18,
        section: "Collective Deception Intro",
        timeRange: "8:15-8:30",
        duration: 15,
        topic: "معرفی خودفریبی جمعی",
        text: "ولی قضیه فقط فردی نیست ما خودفریبی دسته‌جمعی هم داریم",
        notes: "صمیمی‌تر، انتقال به سطح اجتماعی",
        keyWords: ["قضیه", "فردی", "نیست", "دسته", "جمعی"],
        emotion: "transitional",
        energy: "medium",
      },
      {
        id: 19,
        section: "Social Illusions",
        timeRange: "8:30-9:15",
        duration: 45,
        topic: "توهمات اجتماعی",
        text: "جامعه ما ساخته شده روی توهمات مشترک پول چیز باارزشیه ولی فقط نمادی توافق شدست کشورها واقعی هستن ولی فقط خط‌های خیالی روی نقشه‌ان موفقیت معنای مطلق داره ولی فقط ساخته اجتماعیه",
        notes: "لیست کردن توهمات اجتماعی مختلف",
        keyWords: [
          "جامعه",
          "ساخته",
          "توهمات",
          "مشترک",
          "پول",
          "باارزش",
          "نماد",
          "توافق",
          "کشور",
          "خیالی",
          "نقشه",
          "موفقیت",
          "مطلق",
        ],
        emotion: "social-revealing",
        energy: "medium",
      },
      {
        id: 20,
        section: "Matrix Metaphor",
        timeRange: "9:15-10:00",
        duration: 45,
        topic: "استعاره ماتریکس",
        text: "همه ما توی شبکه توهمی زندگی می‌کنیم که خودمون بافتیمش و زیباترینش اینه نمی‌خوایم از این شبکه بیرون بیایم چرا چون این شبکه راحته قابل پیش‌بینیه امنیته",
        notes: "مثل راز بزرگی رو می‌گی، استعاره ماتریکس فیلم",
        keyWords: [
          "شبکه",
          "توهمی",
          "زندگی",
          "بافت",
          "زیبا",
          "بیرون",
          "راحت",
          "پیش‌بینی",
          "امن",
        ],
        emotion: "metaphorical",
        energy: "medium",
      },
      {
        id: 21,
        section: "Reality vs Illusion",
        timeRange: "10:00-10:30",
        duration: 30,
        topic: "واقعیت در مقابل توهم",
        text: "واقعیت واقعیت ترسناکه غیرقابل پیش‌بینیه خودمون رو تهدید می‌کنه پس ترجیح میدیم تو خوابمون بمونیم و فکر کنیم بیداریم",
        notes: "سکوت، نگاه عمیق به دوربین، لحن فلسفی",
        keyWords: [
          "واقعیت",
          "ترسناک",
          "غیرقابل",
          "پیش‌بینی",
          "تهدید",
          "ترجیح",
          "خواب",
          "بیدار",
        ],
        emotion: "philosophical-deep",
        energy: "medium-low",
      },
      {
        id: 22,
        section: "Spiritual Trap Intro",
        timeRange: "10:30-10:45",
        duration: 15,
        topic: "معرفی دام معنوی",
        text: "و حالا نکته‌ای که خیلی‌ها نمی‌دونن خود جستجوی معنوی هم می‌تونه نوعی خودفریبی باشه",
        notes: "انرژی عوض شه، هشدار دهنده، نکته حساس",
        keyWords: [
          "نکته",
          "خیلی",
          "نمی‌دونن",
          "جستجو",
          "معنوی",
          "نوع",
          "خودفریبی",
        ],
        emotion: "warning",
        energy: "medium-high",
      },
      {
        id: 23,
        section: "Spiritual Ego",
        timeRange: "10:45-11:30",
        duration: 45,
        topic: "ایگوی معنوی",
        text: "چطور وقتی می‌گین من روشن‌فکر هستم من بیدار هستم من حقیقت رو فهمیدم کی داره این حرف رو می‌زنه خودتون همون خودی که قراره نابود بشه داره ادعا می‌کنه که نابود شده",
        notes: "سؤالات تند، نشان دادن تناقض، تاکید روی 'کی'",
        keyWords: [
          "چطور",
          "روشن‌فکر",
          "بیدار",
          "حقیقت",
          "فهمیدم",
          "کی",
          "خود",
          "نابود",
          "ادعا",
        ],
        emotion: "challenging-direct",
        energy: "high",
      },
      {
        id: 24,
        section: "Ultimate Paradox",
        timeRange: "11:30-12:00",
        duration: 30,
        topic: "پارادوکس نهایی",
        text: "این یکی از پیچیده‌ترین شکل‌های خودفریبیه خود معنوی حتی این ویدیو هم می‌تونه نوعی خودفریبی باشه شاید دارم خودم رو متقاعد می‌کنم که حقیقت می‌دونم",
        notes: "اعتراف به احتمال خودفریبی خودت، صداقت",
        keyWords: [
          "پیچیده",
          "شکل",
          "خودفریبی",
          "خود",
          "معنوی",
          "ویدیو",
          "متقاعد",
          "حقیقت",
        ],
        emotion: "self-reflective",
        energy: "medium",
      },
      {
        id: 25,
        section: "Meta Recognition",
        timeRange: "12:00-12:30",
        duration: 30,
        topic: "شناخت فرا-سطحی",
        text: "شاید شما دارین خودتون رو متقاعد می‌کنین که دارین حقیقت یاد می‌گیرین از خودفریبی نمی‌شه فرار کرد فقط می‌شه ازش آگاه بود",
        notes: "لبخند تلخ، پذیرش محدودیت انسانی",
        keyWords: ["شاید", "متقاعد", "یاد", "فرار", "آگاه"],
        emotion: "accepting",
        energy: "medium-low",
      },
      {
        id: 26,
        section: "Solution Intro",
        timeRange: "12:30-12:45",
        duration: 15,
        topic: "معرفی راه‌حل",
        text: "پس راه‌حل چیه راه‌حل این نیست که خودفریبی رو متوقف کنیم چون غیرممکنه",
        notes: "آرام‌تر، امیدبخش، انتقال به بخش راه‌حل",
        keyWords: ["راه‌حل", "چیه", "متوقف", "غیرممکن"],
        emotion: "solution-oriented",
        energy: "medium",
      },
      {
        id: 27,
        section: "Awareness Solution",
        timeRange: "12:45-13:00",
        duration: 15,
        topic: "راه‌حل آگاهی",
        text: "راه‌حل اینه که آگاه بشیم هر روز از خودتون این سؤال‌ها رو بپرسین",
        notes: "تاکید روی آگاهی به عنوان راه‌حل",
        keyWords: ["راه‌حل", "آگاه", "هر", "روز", "سؤال"],
        emotion: "instructional",
        energy: "medium",
      },
      {
        id: 28,
        section: "Four Questions",
        timeRange: "13:00-14:00",
        duration: 60,
        topic: "چهار سؤال کلیدی",
        text: "این باور من کی شکل گرفته چرا چه چیزی دارم دفاع می‌کنم اگه یه فرد بیرونی منو نگاه می‌کرد چه تفسیر دیگه‌ای می‌تونست بده و مهم‌ترین سؤال از چی می‌ترسم که اگه نپذیرمش هویتم به خطر بیفته",
        notes: "شمارش سؤالات با انگشت، تاکید روی هر سؤال",
        keyWords: [
          "باور",
          "شکل",
          "گرفته",
          "چرا",
          "دفاع",
          "بیرونی",
          "تفسیر",
          "مهم",
          "می‌ترسم",
          "هویت",
          "خطر",
        ],
        emotion: "practical-guidance",
        energy: "medium",
      },
      {
        id: 29,
        section: "Crack in Matrix",
        timeRange: "14:00-14:30",
        duration: 30,
        topic: "شکاف در ماتریکس",
        text: "این سؤال‌ها شما رو از خودفریبی کامل نجات نمیده ولی شکافی توی شبکه توهم ایجاد می‌کنه و گاهی همین شکاف کافیه تا کمی نور واقعیت به داخل راه پیدا کنه",
        notes: "دست به سینه، استعاره نور، امیدوارکننده",
        keyWords: [
          "سؤال",
          "کامل",
          "نجات",
          "شکاف",
          "شبکه",
          "توهم",
          "کافی",
          "نور",
          "واقعیت",
        ],
        emotion: "hopeful",
        energy: "medium",
      },
      {
        id: 30,
        section: "Challenge Introduction",
        timeRange: "14:30-14:45",
        duration: 15,
        topic: "معرفی چالش",
        text: "حالا چالش من برای شماست یه هفته این آزمایش رو انجام بدین",
        notes: "انرژی بالا، مستقیم به دوربین",
        keyWords: ["چالش", "من", "شما", "هفته", "آزمایش", "انجام"],
        emotion: "challenging",
        energy: "high",
      },
      {
        id: 31,
        section: "Weekly Challenge",
        timeRange: "14:45-15:15",
        duration: 30,
        topic: "چالش هفتگی",
        text: "هر روز صبح بپرسین امروز کجا ممکنه خودم رو گول بزنم هر شب بپرسین امروز کجا خودم رو گول زدم نتیجه رو تو نظرات برام بنویسین مطمئنم که شگفت‌زده میشین",
        notes: "توضیح مرحله به مرحله چالش",
        keyWords: [
          "روز",
          "صبح",
          "امروز",
          "کجا",
          "ممکن",
          "گول",
          "شب",
          "نتیجه",
          "نظرات",
          "شگفت",
        ],
        emotion: "instructional-exciting",
        energy: "high",
      },
      {
        id: 32,
        section: "Call to Action",
        timeRange: "15:15-15:45",
        duration: 30,
        topic: "فراخوان عمل",
        text: "اگه این ویدیو چیزی از جهان‌بینیتون رو لرزوند پسندش کنین اگه فکر می‌کنین کسی نیاز داره این حقیقت رو بشنوه به اشتراک بذارین و اگه می‌خواین عمیق‌تر برین عضو کانال بشین",
        notes: "درخواست‌های استاندارد یوتیوب",
        keyWords: [
          "ویدیو",
          "جهان‌بینی",
          "لرزوند",
          "پسند",
          "نیاز",
          "حقیقت",
          "اشتراک",
          "عمیق",
          "عضو",
          "کانال",
        ],
        emotion: "call-to-action",
        energy: "high",
      },
      {
        id: 33,
        section: "Future Promise",
        timeRange: "15:45-16:00",
        duration: 15,
        topic: "وعده آینده",
        text: "چون قراره ویدیوهای بیشتری بسازم که توهمات راحتتون رو بشکنه",
        notes: "وعده محتوای آینده",
        keyWords: [
          "قراره",
          "ویدیو",
          "بیشتر",
          "بسازم",
          "توهمات",
          "راحت",
          "بشکنه",
        ],
        emotion: "promising",
        energy: "medium-high",
      },
      {
        id: 34,
        section: "Final Wisdom",
        timeRange: "16:00-16:30",
        duration: 30,
        topic: "حکمت نهایی",
        text: "تا ویدیوی بعدی مراقب خودفریبی‌هاتون باشین یا بهتر بگم مراقب باشین که از خودفریبی‌هاتون آگاه باشین چون فرار ازش غیرممکنه ولی آگاه بودن ازش آزادیتون رو آغاز می‌کنه",
        notes: "لبخند پرمعنا، پیام نهایی امیدوارکننده",
        keyWords: [
          "ویدیو",
          "بعدی",
          "مراقب",
          "خودفریبی",
          "بهتر",
          "آگاه",
          "فرار",
          "غیرممکن",
          "آزادی",
          "آغاز",
        ],
        emotion: "wise-concluding",
        energy: "medium",
      },
    ],
  };

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenWords, setSpokenWords] = useState([]);
  const [matchedWords, setMatchedWords] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState("");
  const [importedScript, setImportedScript] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Use imported script if available, otherwise use default
  const activeScript = importedScript || defaultScriptData;

  // File import functionality
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);

          // Validate JSON structure
          if (
            jsonData.scriptInfo &&
            jsonData.sections &&
            Array.isArray(jsonData.sections)
          ) {
            setImportedScript(jsonData);
            setCurrentLineIndex(0);
            resetCurrentLine();
            setError("");
          } else {
            setError(
              "فرمت فایل JSON معتبر نیست. لطفاً ساختار صحیح را بررسی کنید."
            );
          }
        } catch (err) {
          setError("خطا در خواندن فایل JSON: " + err.message);
        }
      };
      reader.readAsText(file);
    } else {
      setError("لطفاً یک فایل JSON معتبر انتخاب کنید.");
    }
  };

  const exportScript = () => {
    const dataStr = JSON.stringify(activeScript, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName =
      "script_" + new Date().toISOString().slice(0, 10) + ".json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = activeScript.scriptInfo?.language || "fa-IR";

      recognitionInstance.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }

        const fullTranscript = finalTranscript + interimTranscript;
        setTranscript(fullTranscript);

        if (finalTranscript) {
          processSpokenText(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        setError(`خطا در تشخیص صوت: ${event.error}`);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start(); // Restart if still listening
        }
      };

      setRecognition(recognitionInstance);
      recognitionRef.current = recognitionInstance;
    } else {
      setError("مرورگر شما از تشخیص صوت پشتیبانی نمی‌کند");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, activeScript]);

  // Clean and normalize Persian text
  const cleanText = (text) => {
    return text
      .toLowerCase()
      .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728)) // Persian to English numbers
      .replace(
        /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g,
        ""
      ) // Keep only Persian chars and spaces
      .replace(/\s+/g, " ")
      .trim();
  };

  // Enhanced similarity function
  const similarity = (word1, word2) => {
    if (word1.length === 0 || word2.length === 0) return 0;
    if (word1 === word2) return 1;

    // Check if one word contains the other
    const longer = word1.length > word2.length ? word1 : word2;
    const shorter = word1.length > word2.length ? word2 : word1;

    if (longer.includes(shorter)) {
      return shorter.length / longer.length;
    }

    // Simple Levenshtein distance-based similarity
    const distance = levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    return 1 - distance / maxLength;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Process spoken text and check for matches
  const processSpokenText = (spokenText) => {
    const currentLine = activeScript.sections[currentLineIndex];
    const cleanSpokenText = cleanText(spokenText);
    const cleanScriptText = cleanText(currentLine.text);

    const spokenWordsArray = cleanSpokenText
      .split(" ")
      .filter((word) => word.length > 0);
    const scriptWordsArray = cleanScriptText
      .split(" ")
      .filter((word) => word.length > 0);

    setSpokenWords(spokenWordsArray);

    // Find matching words with improved algorithm
    const newMatchedWords = new Set();

    spokenWordsArray.forEach((spokenWord) => {
      scriptWordsArray.forEach((scriptWord, index) => {
        // Check for exact match or similar match
        if (
          spokenWord === scriptWord ||
          similarity(spokenWord, scriptWord) > 0.75
        ) {
          newMatchedWords.add(index);
        }
      });

      // Also check against key words for bonus points
      if (currentLine.keyWords) {
        currentLine.keyWords.forEach((keyWord) => {
          const cleanKeyWord = cleanText(keyWord);
          if (
            spokenWord === cleanKeyWord ||
            similarity(spokenWord, cleanKeyWord) > 0.8
          ) {
            // Find this key word in script and mark it
            scriptWordsArray.forEach((scriptWord, index) => {
              if (scriptWord === cleanKeyWord) {
                newMatchedWords.add(index);
              }
            });
          }
        });
      }
    });

    setMatchedWords(newMatchedWords);

    // Calculate progress
    const currentProgress =
      (newMatchedWords.size / scriptWordsArray.length) * 100;
    setProgress(currentProgress);

    // Auto-advance if 75% or more words are matched
    if (
      currentProgress >= 75 &&
      currentLineIndex < activeScript.sections.length - 1
    ) {
      setTimeout(() => {
        goToNextLine();
      }, 1500);
    }
  };

  // Control functions
  const startListening = () => {
    if (recognition) {
      setError("");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const goToNextLine = () => {
    if (currentLineIndex < activeScript.sections.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      resetCurrentLine();
    }
  };

  const goToPreviousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
      resetCurrentLine();
    }
  };

  const resetCurrentLine = () => {
    setSpokenWords([]);
    setMatchedWords(new Set());
    setProgress(0);
    setTranscript("");
    setError("");
  };

  const resetAll = () => {
    setCurrentLineIndex(0);
    resetCurrentLine();
    stopListening();
  };

  // Text-to-speech function
  const speakCurrentLine = () => {
    if ("speechSynthesis" in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        activeScript.sections[currentLineIndex].text
      );
      utterance.lang = activeScript.scriptInfo?.language || "fa-IR";
      utterance.rate = 0.8;
      utterance.pitch = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Jump to section
  const jumpToSection = (sectionIndex) => {
    setCurrentLineIndex(sectionIndex);
    resetCurrentLine();
    stopListening();
  };

  const currentLine = activeScript.sections[currentLineIndex];
  const scriptWords = cleanText(currentLine.text)
    .split(" ")
    .filter((word) => word.length > 0);

  // Calculate overall progress
  const overallProgress =
    ((currentLineIndex + 1) / activeScript.sections.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">
            🎙️ {activeScript.scriptInfo.title}
          </h1>
          <p className="text-blue-100 mb-3">
            {activeScript.scriptInfo.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span>📝 نویسنده: {activeScript.scriptInfo.author}</span>
            <span>⏱️ مدت: {activeScript.scriptInfo.duration}</span>
            <span>🎯 موضوع: {activeScript.scriptInfo.topic}</span>
            <span>🗣️ زبان: {activeScript.scriptInfo.language}</span>
          </div>
        </div>

        {/* Import/Export Controls */}
        <div className="p-6 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">
            📁 مدیریت اسکریپت
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              <Upload size={16} />
              بارگذاری JSON
            </button>
            <button
              onClick={exportScript}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              <Download size={16} />
              دانلود JSON
            </button>
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              📊 آمار
            </button>
            {importedScript && (
              <button
                onClick={() => {
                  setImportedScript(null);
                  setCurrentLineIndex(0);
                  resetCurrentLine();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
              >
                🔄 بازگشت به پیش‌فرض
              </button>
            )}
          </div>
          {importedScript && (
            <div className="mt-3 text-center text-sm text-green-700 bg-green-100 rounded-lg p-2">
              ✅ اسکریپت شخصی بارگذاری شده
            </div>
          )}
        </div>

        {/* Statistics */}
        {showStats && (
          <div className="p-6 bg-blue-50 border-b">
            <h3 className="font-semibold text-blue-800 mb-3">
              📊 آمار اسکریپت
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-blue-600">
                  {activeScript.sections.length}
                </div>
                <div className="text-gray-600">بخش‌ها</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-green-600">
                  {Math.round(overallProgress)}%
                </div>
                <div className="text-gray-600">پیشرفت کل</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-purple-600">
                  {currentLine.duration}s
                </div>
                <div className="text-gray-600">مدت بخش</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-orange-600">
                  {scriptWords.length}
                </div>
                <div className="text-gray-600">کلمات</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bars */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">پیشرفت بخش فعلی</span>
              <span className="text-sm font-bold text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">پیشرفت کل اسکریپت</span>
              <span className="text-sm font-bold text-purple-600">
                {Math.round(overallProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Script Navigation */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                بخش {currentLineIndex + 1} از {activeScript.sections.length}:{" "}
                {currentLine.section}
              </h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span>⏰ {currentLine.timeRange}</span>
                <span>🎭 {currentLine.emotion}</span>
                <span>⚡ انرژی: {currentLine.energy}</span>
                <span>⏱️ {currentLine.duration} ثانیه</span>
              </div>
            </div>
            <button
              onClick={isPlaying ? stopSpeaking : speakCurrentLine}
              className={`p-3 rounded-full transition-colors ${
                isPlaying
                  ? "text-red-600 hover:bg-red-100 bg-red-50"
                  : "text-blue-600 hover:bg-blue-100 bg-blue-50"
              }`}
              title={isPlaying ? "توقف پخش" : "پخش صوتی متن"}
            >
              {isPlaying ? <Pause size={24} /> : <Volume2 size={24} />}
            </button>
          </div>

          {/* Topic description */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <span className="text-sm font-medium text-blue-800">
              📋 موضوع:{" "}
            </span>
            <span className="text-blue-700">{currentLine.topic}</span>
          </div>

          {/* Current script line with highlighted words */}
          <div className="text-lg leading-relaxed mb-4 p-4 bg-white rounded-lg border-r-4 border-blue-500 shadow-sm">
            {scriptWords.map((word, index) => (
              <span
                key={index}
                className={`${
                  matchedWords.has(index)
                    ? "bg-green-200 text-green-800 rounded px-1"
                    : "text-gray-700"
                } transition-all duration-300 hover:bg-yellow-100`}
              >
                {word}{" "}
              </span>
            ))}
          </div>

          {/* Key words display */}
          {currentLine.keyWords && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-600 mb-2 block">
                🔑 کلمات کلیدی:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentLine.keyWords.map((keyWord, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium"
                  >
                    {keyWord}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Director notes */}
          {currentLine.notes && (
            <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg">
              <span className="text-sm font-medium text-orange-800 block mb-2">
                🎬 نکات کارگردانی:
              </span>
              <p className="text-sm text-orange-700 leading-relaxed">
                {currentLine.notes}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-white">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              {isListening ? "توقف ضبط" : "شروع ضبط"}
            </button>

            <button
              onClick={goToPreviousLine}
              disabled={currentLineIndex === 0}
              className="flex items-center gap-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none"
            >
              <ChevronLeft size={20} />
              بخش قبلی
            </button>

            <select
              value={currentLineIndex}
              onChange={(e) => jumpToSection(parseInt(e.target.value))}
              className="px-3 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
            >
              {activeScript.sections.map((section, index) => (
                <option key={section.id} value={index}>
                  {index + 1}. {section.section} ({section.timeRange})
                </option>
              ))}
            </select>

            <button
              onClick={goToNextLine}
              disabled={currentLineIndex === activeScript.sections.length - 1}
              className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none"
            >
              بخش بعدی
              <ChevronRight size={20} />
            </button>

            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              <RotateCcw size={20} />
              شروع مجدد
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              🔄 ناوبری سریع:
            </h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {activeScript.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => jumpToSection(index)}
                  className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                    index === currentLineIndex
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Transcript */}
        {transcript && (
          <div className="p-6 bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-3">
              🎤 متن گفته شده:
            </h3>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-blue-700 text-right leading-relaxed">
                {transcript}
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-6 bg-red-50">
            <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">❌ {error}</p>
            </div>
          </div>
        )}

        {/* Status */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div
              className={`flex items-center gap-2 ${
                isListening ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  isListening ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
              {isListening ? "در حال گوش دادن..." : "آماده برای ضبط"}
            </div>
            <div className="bg-white px-3 py-1 rounded-full">
              کلمات تطبیق: {matchedWords.size} از {scriptWords.length}
            </div>
            <div className="bg-white px-3 py-1 rounded-full">
              دقت:{" "}
              {scriptWords.length > 0
                ? Math.round((matchedWords.size / scriptWords.length) * 100)
                : 0}
              %
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
          <h3 className="font-semibold text-orange-800 mb-3">
            📋 راهنمای استفاده:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
            <ul className="space-y-2">
              <li>• 📁 فایل JSON اسکریپت خود را بارگذاری کنید</li>
              <li>• 🎙️ روی "شروع ضبط" کلیک کنید و شروع به خواندن کنید</li>
              <li>• 🟢 کلمات تطبیق یافته با رنگ سبز نشان داده می‌شوند</li>
              <li>• ⚡ وقتی 75% کلمات گفته شود، خودکار به بخش بعدی می‌رود</li>
            </ul>
            <ul className="space-y-2">
              <li>• 🔧 می‌توانید دستی بین بخش‌ها جابجا شوید</li>
              <li>• 🔊 برای شنیدن تلفظ، روی آیکون صوت کلیک کنید</li>
              <li>• 📝 نکات کارگردانی برای هر بخش نمایش داده می‌شود</li>
              <li>• 💾 اسکریپت خود را به صورت JSON دانلود کنید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceScriptReader;
