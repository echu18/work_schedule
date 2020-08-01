
class Api::WorkOrdersController < ApplicationController
    # include Rails.application.routes.url_helpers
    require 'date'
    require 'tzinfo'


    def index
        @work_orders = WorkOrder.all
        render :teplate => 'work_orders/index'
    end

    
    def show
        @work_order = WorkOrder.find(params[:id])
        render :show
    end


    def create
        filtered_params = work_order_params
        filtered_params[:time] = DateTime.strptime(work_order_params[:time], '%m/%d/%y %H:%M')
      
        @work_order = WorkOrder.new(filtered_params)

        if @work_order.save
            render :show
        else
            render json: @work_order.errors.full_messages, status: 401
        end
    end


    def import_data
        @import_data = JSON.parse(params[:import_data])


        if @import_data && @import_data.length > 0
            @import_data.each do |import|

                # Specify time zone for DateTime.strptime so that it gets converted from PST/PDT to be stored in UTC
                time_zone = 'Pacific Daylight Time (US & Canada)'

                filtered_params = {id: import["id"], technician_id: import["technician_id"], location_id: import["location_id"], time: DateTime.strptime(import["time"]+"#{time_zone}", '%m/%d/%y %H:%M %z'),
                                    duration: import["duration"], price: import["price"]}


                # Example
                # d = DateTime.strptime("10/1/19 6:00 AM", '%m/%d/%y %H:%M %z')
            
                @work_order = WorkOrder.new(filtered_params)

                if !@work_order.save
                    render json: @work_order.errors.full_messages, status: 401
                    return;
                end
            end
        end
        render :show
    end


    def update
        @work_order = WorkOrder.find_by(id: params[:id])

        if @work_order && @work_order.update_attributes(work_order_params)
            render :show
        elsif !@work_order
            render json: ['Could not find work order'], status: 400
        else
            render json: @work_order.errors.full_messages, status: 401
        end
    end


    def destroy
        @work_order = WorkOrder.find(params[:id])

        if @work_order
            @work_order.destroy
            render :show
        else
            render ['Could not find work order']
        end
    end

    private

    def work_order_params
        params.require(:work_order).permit(:id, :technician_id, :location_id, :time, :duration, :price)
    end
end




