import React, { useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer, View, NavigateAction } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type CalendarView = View | 'threeMonths'

interface CustomToolbarProps {
  onView: (view: View) => void
  onNavigate: (action: NavigateAction) => void
  label: string
}

const Calendar: React.FC = () => {
  const [view, setView] = useState<CalendarView>('month')
  const [date, setDate] = useState(new Date())

  const handleViewChange = (newView: View) => {
    setView(newView === 'agenda' ? 'month' : newView)
  }

  const ThreeMonthView: React.FC<{ date: Date }> = ({ date }) => (
    <div className="flex flex-wrap justify-center">
      {[-1, 0, 1].map((offset) => (
        <div key={offset} className="w-full md:w-1/3 p-2">
          <BigCalendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 300 }}
            date={addMonths(date, offset)}
            views={['month']}
            toolbar={false}
          />
        </div>
      ))}
    </div>
  )

  const CustomToolbar: React.FC<CustomToolbarProps> = ({ onView, onNavigate, label }) => (
    <div className="flex justify-between items-center mb-4">
      <div>
        <button onClick={() => onNavigate('PREV')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Previous
        </button>
        <button onClick={() => onNavigate('NEXT')} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
      <h2 className="text-xl font-bold">{label}</h2>
      <div>
        <button onClick={() => onView('month')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Month
        </button>
        <button onClick={() => onView('week')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Week
        </button>
        <button onClick={() => onView('day')} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Day
        </button>
        <button onClick={() => setView('threeMonths')} className="px-4 py-2 bg-blue-500 text-white rounded">
          3 Months
        </button>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="p-4">
        {view === 'threeMonths' ? (
          <>
            <CustomToolbar
              onView={handleViewChange}
              onNavigate={(action: NavigateAction) => setDate(action === 'PREV' ? subMonths(date, 3) : addMonths(date, 3))}
              label={`${format(subMonths(date, 1), 'MMMM yyyy')} - ${format(addMonths(date, 1), 'MMMM yyyy')}`}
            />
            <ThreeMonthView date={date} />
          </>
        ) : (
          <BigCalendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={view as View}
            onView={handleViewChange}
            date={date}
            onNavigate={setDate}
            components={{
              toolbar: CustomToolbar,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Calendar

