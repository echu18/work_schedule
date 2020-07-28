class Api::LocationsController < ApplicationController
    def index
        @locations = Location.all
    end


    def show
        @location = Location.find(params[:id])
        render :show
    end


    def create        
        @location = Location.new(location_params)
        
        if @location.save
            render :show
        else
            render json: @location.errors.full_messages, status: 401
        end
    end



    def update
        @location = Location.find_by(id: params[:id])

        if @location && @location.update_attributes(location_params)
            render :show
        elsif !@location
            render json: ['Could not find location'], status: 400
        else
            render json: @location.errors.full_messages, status: 401
        end
    end


    def destroy
        @location = Location.find(params[:id])

        if @location
            @location.destroy
            render :show
        else
            render ['Could not find location']
        end
    end

    private

    def location_params
        params.require(:location).permit(:id, :name, :city)
    end
end
