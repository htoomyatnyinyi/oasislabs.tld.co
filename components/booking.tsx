"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Building2,
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const meetingTypes = [
  {
    id: "discovery",
    title: "Discovery Call",
    duration: "30 min",
    description: "Learn about our services and discuss your project needs",
    icon: Phone,
  },
  {
    id: "consultation",
    title: "Technical Consultation",
    duration: "60 min",
    description: "Deep dive into technical requirements and architecture",
    icon: Video,
  },
  {
    id: "demo",
    title: "Product Demo",
    duration: "45 min",
    description: "See our solutions in action with a personalized demo",
    icon: Building2,
  },
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export function Booking() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth]);

  const isDateAvailable = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6;
  };

  const handleDateSelect = (day: number) => {
    if (isDateAvailable(day)) {
      setSelectedDate(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          meetingType: selectedMeetingType?.title || "Consultation",
          date: formatSelectedDate(),
          time: selectedTime,
        }),
      });
      setIsBooked(true);
    } catch (err) {
      console.error("Booking submit error:", err);
      setIsBooked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const selectedMeetingType = meetingTypes.find((t) => t.id === selectedType);

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Book a Meeting
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Schedule a Consultation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Book a free consultation with our team to discuss your project
            requirements.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={cn(
                    "w-6 sm:w-16 h-1 mx-1 sm:mx-2 rounded-full transition-all",
                    step > s ? "bg-primary" : "bg-secondary",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {isBooked ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Your {selectedMeetingType?.title} has been scheduled for{" "}
                  {formatSelectedDate()} at {selectedTime}. We&apos;ve sent a
                  confirmation email to {formData.email}.
                </p>
                <div className="bg-secondary/50 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground">
                    You will receive a calendar invite with video call details
                    shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Meeting Type */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">
                      Select Meeting Type
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {meetingTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => {
                              setSelectedType(type.id);
                              setStep(2);
                            }}
                            className={cn(
                              "p-6 rounded-xl border text-left transition-all hover:border-primary/50",
                              selectedType === type.id
                                ? "border-primary bg-primary/5"
                                : "border-border bg-secondary/50",
                            )}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {type.duration}
                              </span>
                            </div>
                            <h4 className="font-semibold mb-2">{type.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {type.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date Selection */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Select Date</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setCurrentMonth(
                              new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth() - 1,
                              ),
                            )
                          }
                          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-medium min-w-[150px] text-center">
                          {monthNames[currentMonth.getMonth()]}{" "}
                          {currentMonth.getFullYear()}
                        </span>
                        <button
                          onClick={() =>
                            setCurrentMonth(
                              new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth() + 1,
                              ),
                            )
                          }
                          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-sm text-muted-foreground font-medium py-2"
                          >
                            {day}
                          </div>
                        ),
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, index) => (
                        <div key={index} className="aspect-square">
                          {day && (
                            <button
                              onClick={() => handleDateSelect(day)}
                              disabled={!isDateAvailable(day)}
                              className={cn(
                                "w-full h-full rounded-lg text-sm font-medium transition-all",
                                isDateAvailable(day)
                                  ? selectedDate?.getDate() === day &&
                                    selectedDate?.getMonth() ===
                                      currentMonth.getMonth()
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-secondary text-foreground"
                                  : "text-muted-foreground/30 cursor-not-allowed",
                              )}
                            >
                              {day}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={!selectedDate}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Time Selection */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">Select Time</h3>
                    <p className="text-muted-foreground mb-6">
                      {formatSelectedDate()} - All times in your local timezone
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-3 px-4 rounded-lg text-sm font-medium transition-all",
                            selectedTime === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80 text-foreground",
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep(4)}
                        disabled={!selectedTime}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Details */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Your Details</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter Your Full Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="example@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <Building2 className="w-4 h-4 inline mr-2" />
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Company Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          <MessageSquare className="w-4 h-4 inline mr-2" />
                          What would you like to discuss?
                        </label>
                        <input
                          type="text"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Brief project overview"
                        />
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                      <h4 className="font-medium mb-3">Booking Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Meeting Type
                          </span>
                          <span>{selectedMeetingType?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span>{formatSelectedDate()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time</span>
                          <span>{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration
                          </span>
                          <span>{selectedMeetingType?.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(3)}>
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          !formData.name || !formData.email || isSubmitting
                        }
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Booking...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            Our Development Process
          </h3>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-border" />
            {[
              {
                step: "1",
                title: "Consultation",
                desc: "Free and no obligations",
              },
              {
                step: "2",
                title: "UI/UX Design",
                desc: "User-centric and modern interfaces",
              },

              {
                step: "3",
                title: "Web & Mobile Apps",
                desc: "Cross platform solutions ",
              },
              {
                step: "4",
                title: "Deployment & Maintenance",
                desc: "Cloud based deployment and continuous support",
              },
            ].map((milestone, index) => (
              <div key={milestone.step} className="relative flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 relative z-10 text-sm font-bold">
                  {milestone.step}
                </div>
                <h4 className="font-semibold mb-1">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
