import { getBookings, deleteBooking } from "@/app/dashboard/actions";
import { Calendar, Clock, User, Mail, Building, Trash2 } from "lucide-react";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings & Consultations</h1>
        <p className="text-muted-foreground">
          View and manage consultation requests from clients ({bookings.length})
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">No bookings recorded yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {b.meetingType}
                  </span>
                  <h3 className="font-semibold text-lg mt-2">{b.name}</h3>
                </div>
                <form action={deleteBooking.bind(null, b.id)}>
                  <button
                    type="submit"
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    title="Delete booking"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>

              <div className="text-sm space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${b.email}`} className="hover:underline text-foreground">
                    {b.email}
                  </a>
                </div>
                {b.company && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>{b.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-chart-2" />
                    <span className="font-medium text-foreground">{b.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-chart-2" />
                    <span className="font-medium text-foreground">{b.time}</span>
                  </div>
                </div>
              </div>

              {b.message && (
                <div className="rounded-md bg-secondary/50 p-3 text-sm italic text-muted-foreground">
                  "{b.message}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
