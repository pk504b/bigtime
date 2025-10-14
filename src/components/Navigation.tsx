import { ClockIcon, PomodoroIcon, StopwatchIcon, TimerIcon } from "../lib/icons";
import NavButton from "./NavButton";

export default function Navigation() {
  return (
    <nav className="bg-midnight">
      <div className="container mx-auto flex">
        <NavButton href="/clock" name="Clock" icon={<ClockIcon />} />
        <NavButton href="/timer" name="Timer" icon={<TimerIcon />} />
        <NavButton href="/stopwatch" name="Stopwatch" icon={<StopwatchIcon />} />
        <NavButton href="/pomodoro" name="Pomodoro" icon={<PomodoroIcon />} />
      </div>
    </nav>
  );
}
