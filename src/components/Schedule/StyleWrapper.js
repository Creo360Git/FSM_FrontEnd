import styled from "@emotion/styled";

const StyleWrapper = styled.div`
    .fc .fc-toolbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .fc-day-today {
        background: rgba(251, 255, 69, 0.4) !important;
    }
    .fc .fc-toolbar-title {
        font-size: 18px;
        margin: 0;
        color: #2B43CF;
    }
    .fc .fc-col-header-cell-cushion {
        text-transform: uppercase;
      }
    .fc .fc-toolbar.fc-header-toolbar {
        margin-bottom: 0.5em;
    }
    .fc table, .fc th, .fc td {
        border: 1px solid rgba(148, 156, 240, 0.76);
        border-collapse: collapse;
    }
    .fc .fc-daygrid-day-number {
        position: absolute;
        width: 17px;
        height: 17px;
        left: 8px;
        top: 10px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */

        display: flex;
        align-items: center;

        color: #2B43CF;
    }
    .fc-button.fc-prev-button, .fc-button.fc-next-button{
        background: none;
        color: #007AFF;
        background-image: none;

    }
    .fc .fc-button-primary {
        border-color: white !important;
    }
    .fc .fc-button-primary:hover, .fc-button.fc-next-button:hover{
        color: #007AFF;
        background-color: white;
    }
    .fc .fc-button-primary:not(:disabled):active,
        color: #007AFF;
        background-color: white;
        border-color: white;
  }
`
export default StyleWrapper