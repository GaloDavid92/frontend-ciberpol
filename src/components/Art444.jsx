import React, { useState } from 'react';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { Card } from 'primereact/card';

const Art444 = ({a444}) => {

    const [art444, setArt444] = useState({
        art1: "",
        art2: "",
        art3: "",
        art4: "",
        art5: "",
        art6: "",
        art7: "",
        art8: "",
        art9: "",
        art10: "",
        art11: "",
        art12: "",
        art13: "",
        art14: "",
    })

    const options = [
        { value: 'Seleccionado', icon: 'pi pi-globe' },
        { value: 'Cumplido', icon: 'pi pi-lock-open' }
    ];

    return (
        <>
            <div className="field col-12 md:col-12">
                <Card subTitle="Nª ART. 444 COIP">
                    <div className="p-fluid grid">
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art1} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art1: e.value })
                                        a444({ ...art444, art1: e.value })
                                    }} />
                                <label>N. 1 {art444.art1}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art2} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art2: e.value })
                                        a444({ ...art444, art2: e.value })
                                    }} />
                                <label>N. 2 {art444.art2}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art3} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art3: e.value })
                                        a444({ ...art444, art3: e.value })
                                    }} />
                                <label>N. 3 {art444.art3}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art4} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art4: e.value })
                                        a444({ ...art444, art4: e.value })
                                    }} />
                                <label>N. 4 {art444.art4}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art5} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art5: e.value })
                                        a444({ ...art444, art5: e.value })
                                    }} />
                                <label>N. 5 {art444.art5}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art6} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art6: e.value })
                                        a444({ ...art444, art6: e.value })
                                    }} />
                                <label>N. 6 {art444.art6}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art7} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art7: e.value })
                                        a444({ ...art444, art7: e.value })
                                    }} />
                                <label>N. 7 {art444.art7}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art8} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art8: e.value })
                                        a444({ ...art444, art8: e.value })
                                    }} />
                                <label>N. 8 {art444.art8}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art9} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art9: e.value })
                                        a444({ ...art444, art9: e.value })
                                    }} />
                                <label>N. 9 {art444.art9}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art10} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art10: e.value })
                                        a444({ ...art444, art10: e.value })
                                    }} />
                                <label>N. 10 {art444.art10}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art11} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art11: e.value })
                                        a444({ ...art444, art11: e.value })
                                    }} />
                                <label>N. 11 {art444.art11}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art12} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art12: e.value })
                                        a444({ ...art444, art12: e.value })
                                    }} />
                                <label>N. 12 {art444.art12}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art13} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art13: e.value })
                                        a444({ ...art444, art13: e.value })
                                    }} />
                                <label>N. 13 {art444.art13}</label>
                            </div>
                        </div>
                        <div className="field col-12 md:col-2">
                            <div className="field-checkbox m-0">
                                <MultiStateCheckbox value={art444.art14} options={options} optionValue="value"
                                    onChange={(e) => {
                                        setArt444({ ...art444, art14: e.value })
                                        a444({ ...art444, art14: e.value })
                                    }} />
                                <label>N. 14 {art444.art14}</label>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Art444