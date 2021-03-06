import React, { useState } from 'react'
import { IDict } from '../common'
import * as helpers from '../helpers'

export interface ISchemaFieldProps {
  column: IDict
  metadata: IDict
  removeField: any
  updateField: any
}

export function SchemaField(props: ISchemaFieldProps) {
  const types = helpers.getFieldTypes()
  const formats = helpers.getFieldFormats(props.column.field.type)
  const [isDetails, setIsDetails] = useState(false)
  return (
    <div className="tableschema-ui-editor-field">
      {/* General */}
      <div className="row">
        {/* Name */}
        <div className="col-md-4 name">
          <div className="handle">&equiv;</div>
          <div className="input-group">
            <div className="input-group-addon">
              <div>Name</div>
            </div>
            <input
              type="text"
              className="form-control"
              defaultValue={props.column.field.name}
              onBlur={(ev) => props.updateField(props.column.id, 'name', ev.target.value)}
            />
          </div>
        </div>

        {/* Type */}
        <div className="col-md-3 type">
          <div className="input-group">
            <div className="input-group-addon">
              <div>Type</div>
            </div>
            <select
              className="form-control"
              value={props.column.field.type}
              onChange={(ev) => {
                props.updateField(props.column.id, 'format', 'default')
                props.updateField(props.column.id, 'type', ev.target.value)
              }}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Format */}
        <div className="col-md-3 format">
          <div className="input-group">
            <div className="input-group-addon">
              <div>Format</div>
            </div>
            <Format
              formats={formats}
              format={props.column.field.format}
              onChange={(ev: any) => {
                props.updateField(props.column.id, 'format', ev.target.value)
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="col-md-2 controls">
          {/* Details */}
          <button
            type="button"
            className="btn btn-light btn-lg button-details"
            aria-expanded="false"
            onClick={() => setIsDetails(!isDetails)}
          >
            Details
          </button>

          {/* Remove */}
          <button
            type="button"
            className="btn btn-light btn-lg button-remove"
            onClick={(ev) => {
              ev.preventDefault()
              props.removeField(props.column.id)
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Details */}
      {isDetails && (
        <div className="details">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                {/* Extra fields */}
                <div className="col-md-4 extra">
                  {/* Title */}
                  <div className="form-group">
                    <label htmlFor={`field-title-${props.column.id}`}>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`field-title-${props.column.id}`}
                      defaultValue={props.column.field.title}
                      onBlur={(ev) =>
                        props.updateField(props.column.id, 'title', ev.target.value)
                      }
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label htmlFor={`field-description-${props.column.id}`}>
                      Description
                    </label>
                    <textarea
                      rows={5}
                      className="form-control"
                      id={`field-description-${props.column.id}`}
                      defaultValue={props.column.field.description}
                      onBlur={(ev) => {
                        const value = ev.target.value
                        props.updateField(props.column.id, 'description', value)
                      }}
                    />
                  </div>
                </div>

                {/* Sample data */}
                <div className="col-md-8 data">
                  {!!(props.column.values || []).length && (
                    <div className="form-group">
                      <label>
                        Data <small>(first 5 values)</small>
                      </label>
                      <table className="table table-condensed">
                        <thead>
                          <tr>
                            <th>{props.column.field.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.column.values.map((value: any, index: any) => (
                            <tr key={index}>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Internal

function Format(props: { formats: string[]; format: string; onChange: any }) {
  if (!props.formats.includes('custom')) {
    return (
      <select className="form-control" value={props.format} onChange={props.onChange}>
        {props.formats.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    )
  } else {
    return (
      <input
        type="text"
        className="form-control"
        defaultValue={props.format}
        onBlur={props.onChange}
      />
    )
  }
}
