import React, { Component, Fragment } from "react";
import CustomInput from "UI/CustomInput/CustomInput";

export default class AutocompletePlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            results: [],
            isLoading: false,
            selected: false,
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);

        if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
            throw new Error(
                "You don't have any 'process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN'"
            );
        }
    }

    handleSearchChange(e) {
        this.props.onInputChange(e);
        this.setState({
            ...this.state,
            search: e.target.value,
            isLoading: true,
        });

        // Stop the previous setTimeout if there is one in progress
        clearTimeout(this.timeoutId);

        // Launch a new request in 1000ms
        this.timeoutId = setTimeout(() => {
            this.performSearch();
        }, 1000);
    }
    performSearch() {
        if (this.state.search === "") {
            this.setState({
                ...this.state,
                results: [],
                isLoading: false,
            });
            return;
        }
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&country=SG`
        )
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    ...this.state,
                    results: data.features,
                    isLoading: false,
                    selected: false,
                });
            });
    }
    handleItemClicked(place) {
        this.setState({
            ...this.state,
            search: place,
            results: [],
            selected: true,
        });
        this.props.onInputChange({ target: { value: place } });
    }

    render() {
        return (
            <Fragment>
                <CustomInput
                    inputProps={{
                        ...this.props.inputProps,
                        onChange: this.handleSearchChange,
                        type: "text",
                        value: this.props.value,
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                        margin: "none",
                    }}
                    labelText={this.props.labelText}
                    error={this.props.error}
                />
                {this.state.search !== "" && !this.state.selected && (
                    <ul className="AutocompletePlace-results">
                        {this.state.results.slice(0, 3).map((place) => (
                            <li
                                key={place.id}
                                className="AutocompletePlace-items"
                                onClick={() =>
                                    this.handleItemClicked(place.place_name)
                                }
                            >
                                {place.place_name}
                            </li>
                        ))}
                    </ul>
                )}
            </Fragment>
        );
    }
}
