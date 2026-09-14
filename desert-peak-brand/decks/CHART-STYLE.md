# Chart style

Two chart types. Bar for comparing amounts across categories (limits by carrier, premium by option). Line for one quantity over time (premium history, a deductible's effect across claim sizes). Nothing else: no pie, no donut, no stacked area, no 3D, no gradients, no drop shadows, no data labels floating on leader lines.

## Colours, in order of use

| Series | Role | Hex |
|---|---|---|
| 1 | `brand` | #923D28 |
| 2 | `accent` | #C18E3D |
| 3 | `ink-muted` | #605A52 |
| 4 | `positive` | #005243 |
| 5 | `notice` | #715700 |

Never `critical` (#610010) as a series colour: red on a chart reads as an alarm, and the deck never alarms. The "current policy" series, when present, is always series 1 (`brand`); the options follow in order. Gridlines `border` (#DDD6CE), 0.5 pt, horizontal only. Axis text `ink-muted`, Archivo 10–11 pt, tabular figures (the deck fonts default to tabular). Plot background: none (the slide surface shows through).

## Labels instead of legends

If every bar can carry its value and every series can be named at the end of its line, there is no legend. Put the category name under the bar and the value above it, in `ink`. On a line chart, label the line at its right-hand end. Add a legend only when there are more than three series and labelling would collide, and then place it above the plot, left-aligned, no box.

## Worked example, bar

"Annual premium by option": four bars, categories Current policy / Carrier A / Carrier B / Carrier C, values $1,842 / $2,106 / $2,214 / $2,048 (illustrative). Current policy in `brand`, the three options in `ink-muted` so the current one stands out and the options are compared among themselves. Values above the bars in Archivo 12 pt, `$` and thousands separators, tabular figures. Y axis hidden (the labels carry the values); baseline `border-strong` 0.75 pt. Bars 60 % of the category width, square corners. Caption under the chart in `ink-muted` 10 pt: "Illustrative figures for layout review. Not a quote."

## Worked example, line

"Out-of-pocket at three claim sizes by deductible": x axis $1,000 / $5,000 / $25,000 claim, one line per deductible ($500 in `brand`, $1,000 in `accent`, $2,500 in `ink-muted`). Lines 2 pt, no markers except a 4 pt dot at each data point, labels at the right end of each line ("$500 deductible"). Y axis in $ with tabular figures, three or four gridlines, no minor ticks. Caption as above.

## In PowerPoint

Insert a native chart (Insert → Chart), then set the series fills to the hex values above, remove the legend, turn on data labels (position: outside end), set the gridline colour and weight, and set the fonts to Archivo. Do not paste a chart image from another tool; it will not match the type or the colour and the token lock cannot verify it.
